import "./conversation.css"
import { useEffect, useState } from "react"
import axios from "axios"

const Conversation = ({conversation, currentUser}) => {

  const [user, setUser] = useState([])

  useEffect(()=>{
    const friendId = conversation.members.find(x=> x !== currentUser._id)
    const getUser = async () => {
      try{
        const res = await axios("/user?userId="+friendId)
        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[currentUser, conversation])

  const {REACT_APP_PUBLIC_FOLDER} = process.env

  return (
    <div className="conversation">
      <img src={user?.profilePicture ? `${REACT_APP_PUBLIC_FOLDER}perfil/${user.profilePicture}` : `${REACT_APP_PUBLIC_FOLDER}perfil/noavatar.png`} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation