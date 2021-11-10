import {useState, useEffect} from 'react'
import './profile.css'
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import axios from 'axios'
import {useParams} from 'react-router'

function Profile() {

  const [user, setUser] = useState([])
  const username = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`)
      setUser(res.data)
    }
    fetchUser() 
  },[username])


  return (
    <>
    <Topbar />
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img className="profileCoverImg" src={user.coverPicture ? PF+ user.coverPicture : PF + "perfil/noavatar.png"} alt="Foto de Portada" />
            <img className="profileUserImg" src={user.profilePicture ? PF+ user.profilePicture : PF + "perfil/noavatar.png"} alt="Foto de Perfil" />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDescription">{user.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed username={username}/>
          <Rightbar user={user}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
