import './rightbar.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Add, Remove} from '@material-ui/icons'

export default function Rightbar({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const auth = useSelector(state => state)
  const currentUser = auth.auth.user  

  const HomeRightbar = () =>{
    return (
    <>
      <div className="birthdayContainer">
          <img className="birthdayImg"src="http://localhost:3000/assets/birthday.png" alt="" />
          <span className="birthdayText">
            <b>Juan y 3 amigos más cumplen años hoy</b>
          </span>
        </div>
        <img className="rightbarAd" src="http://localhost:3000/assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
        </ul>
    </>
    )
  }

  const ProfileRightbar = () => {

    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(currentUser.following.includes(user?.id))

    console.log(user)
    console.log(currentUser)
    console.log(currentUser.following.includes(user?.id))

    useEffect(() => {
      const getFriends = async () => {
        try{
          const friendList = await axios.get("/user/friends/" + user._id)
          setFriends(friendList.data)
        }catch(err){
          console.log(err)
        }
      }  
      getFriends()
    }, [])

    const handleFollow = async () => {
      try{
        if (followed){
          await axios.put(`/user/${user._id}/follow`, {userId:currentUser._id})
        }else{
          await axios.put(`/user/${user._id}/unfollow`, {userId:currentUser._id})
        }
      }catch(err){
        console.log(err)
      }
      setFollowed(!followed)
    }

    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend)=>(
            <Link to ={`/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                <img 
                  src={ 
                    friend.profilePicture 
                      ? PF + friend.profilePicture 
                      : PF+"perfil/noavatar.png"
                    } 
                  alt="Imagen de perfil de amigos" 
                  className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>  
            </Link>
          ))}
          
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {
          user ? <ProfileRightbar /> : <HomeRightbar />
        }
      </div>
    </div>
  )
}
