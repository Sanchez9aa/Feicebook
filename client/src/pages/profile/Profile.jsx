import { useState, useEffect } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rigthbar from "../../components/rigthbar/Rigthbar";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { REACT_APP_PUBLIC_FOLDER } = process.env;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.profilePicture
                    ? `${REACT_APP_PUBLIC_FOLDER}perfil/${user.profilePicture}`
                    : `${REACT_APP_PUBLIC_FOLDER}perfil/noavatar.png`
                }
                alt="Foto de Portada"
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? `${REACT_APP_PUBLIC_FOLDER}perfil/${user.profilePicture}`
                    : `${REACT_APP_PUBLIC_FOLDER}perfil/noavatar.png`
                }
                alt="Foto de Perfil"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDescription">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rigthbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
