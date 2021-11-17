import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Logout } from "../../redux/actions/userActions";
import { useRef, useEffect } from "react";
import {io} from "socket.io-client"


const Topbar = () => {

  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
  },[])

  const socket = useRef()
  const auth = useSelector((state) => state)

  const {user} = auth.auth

  const dispatch = useDispatch()

  const handleLogout = () => {
    /* localStorage.removeItem("loginIn") */
    dispatch(Logout())
    socket.current.emit("setDesconexion", user._id)
  }

  return (
    <div className= "topbarContainer">
        <div className="topbarLeft"> 
          <Link to="/" style={{textDecoration: "none"}}>
            <span className="logo">Feicebook</span>
          </Link>
        </div>
        <div className="topbarCenter"> 
          <div className="searchbar">
            <Search className="searchIcon"/>
            <input placeholder="Search for friend, post or video" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight"> 
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">
                1
              </span>
            </div>
            <div className="topbarIconItem">
              <Link to={"/messenger"}>
                <Chat />
              </Link>
              <span className="topbarIconBadge">
                2
              </span>
            </div>
            <div className="topbarIconItem" onClick={handleLogout}>
              <Notifications />
              <span className="topbarIconBadge">
                3
              </span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
          <img src={ user.profilePicture ? "/assets/perfil/" +user.profilePicture : "/assets/perfil/noavatar.png" } alt="changed" className="topbarImg" />
          </Link>
        </div>
    </div>  
  )
}
    

export default Topbar