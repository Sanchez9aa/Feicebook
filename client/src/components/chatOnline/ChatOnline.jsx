import axios from "axios";
import "./chatOnline.css";
import { useEffect, useState } from "react";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const { REACT_APP_PUBLIC_FOLDER } = process.env;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("user/friends/" + currentUserId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((x) => onlineUsers.includes(x._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/chats/find/${currentUserId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((x) => (
        <div className="chatOnlineFriend" onClick={(e) => handleClick(x)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                x?.profilePicture
                  ? `${REACT_APP_PUBLIC_FOLDER}perfil/${x.profilePicture}`
                  : `${REACT_APP_PUBLIC_FOLDER}/perfil/noavatar.png`
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{x.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
