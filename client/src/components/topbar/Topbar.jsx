import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Topbar = () => {
  const auth = useSelector((state) => state)

  const {user} = auth.auth

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
            <div className="topbarIconItem">
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