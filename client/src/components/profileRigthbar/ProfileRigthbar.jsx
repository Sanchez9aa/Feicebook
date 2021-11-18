import "./profileRigthbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Add, Remove } from "@material-ui/icons";

const ProfileRigthbar = ({ user }) => {
  const { REACT_APP_PUBLIC_FOLDER } = process.env;
  const auth = useSelector((state) => state);
  const currentUser = auth.auth.user;

  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState();

  useEffect(() => {
    const getFollowed = async () => {
      try {
        const currentuser = await axios.get("/user?userId=" + currentUser._id);
        setFollowed(currentuser.data.following.some((x) => x === user._id));
      } catch (err) {
        console.log(err);
      }
    };
    getFollowed();
  }, [user._id, currentUser._id, followed]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?._id]);

  const handleFollow = async () => {
    try {
      if (!followed) {
        await axios.put(`/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <>
      {user.username !== currentUser.username && (
        <button className="rigthbarFollowButton" onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className="rigthbarTitle">User Information</h4>
      <div className="rigthbarInfo">
        <div className="rigthbarInfoItem">
          <span className="rigthbarInfoKey">City:</span>
          <span className="rigthbarInfoValue">{user.city}</span>
        </div>
        <div className="rigthbarInfoItem">
          <span className="rigthbarInfoKey">From:</span>
          <span className="rigthbarInfoValue">{user.from}</span>
        </div>
      </div>
      <h4 className="rigthbarTitle">User Friends</h4>
      <div className="rigthbarFollowings">
        {friends.map((friend) => (
          <Link to={`/profile/${friend.username}`}>
            <div className="rigthbarFollowing">
              <img
                src={
                  friend.profilePicture
                    ? `${REACT_APP_PUBLIC_FOLDER}/perfil/${friend.profilePicture}`
                    : `${REACT_APP_PUBLIC_FOLDER}/perfil/noavatar.png`
                }
                alt="Imagen de perfil de amigos"
                className="rigthbarFollowingImg"
              />
              <span className="rigthbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProfileRigthbar;
