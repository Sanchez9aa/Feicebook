import React, {useState, useEffect, useRef} from 'react'
import "./messenger.css"
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/messages/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {io} from "socket.io-client"

export default function Messenger() {

  const [conversations, setConversations ] = useState([])
  const [currentChat, setCurrentChat ] = useState(null)
  const [messages, setMessages ] = useState([])
  const [newMessage, setNewMessage ] = useState("")
  const [gotMessage, setGotMessage ] = useState(null)
  const [onlineUsers, setOnlineUsers ] = useState([])
  const socket = useRef()
  const ScrollRef = useRef()
  
  const auth = useSelector(state => state)
  const currentUser = auth.auth.user

  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      console.log(data)
      setGotMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [messages])

  console.log(gotMessage)

  useEffect(()=>{
    gotMessage && currentChat?.members.includes(gotMessage.sender) &&
    setMessages((prev)=>[...prev, gotMessage])
  },[gotMessage, currentChat])

  useEffect(()=>{
    socket.current.emit("addUser", currentUser._id)
    socket.current.on("getUsers", users=>{
      setOnlineUsers(currentUser.following.filter(x=>users.some(y=>y.userId === x)))
    })
  },[currentUser])

  useEffect(()=>{
    const getConversations = async () => {
      try{
        const res = await axios.get("/chats/"+currentUser._id)
        setConversations(res.data)
      }catch(err){
        console.log(err)
      }      
    } 
    getConversations()
  },[currentUser._id])

  useEffect(()=>{
    const getMessages = async () => {
      try{
        const res = await axios.get("/messages/"+currentChat?._id)
        setMessages(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getMessages()
  },[currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      conversationId: currentChat._id,
      sender: currentUser._id,
      text: newMessage
    }

    const receiverId = currentChat.members.find(member => member !== currentUser._id)

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiverId,
      text: newMessage
    })
    try{
      const res = await axios.post("/messages", message)
      setMessages([...messages, res.data])
      setNewMessage("")
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    ScrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  return ( 
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">Menu
            <input type="text" placeholder="Search Friends" className="chatMenuInput" />
            {conversations.map(x => (
              <div onClick={()=> setCurrentChat(x)}>
                <Conversation conversation={x} currentUser={currentUser}/>
              </div>
            ))}
          </div>
        
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ? 
            <>
            <div className="chatBoxTop">
              {messages.map(x => (
                <div ref={ScrollRef}>
                  <Message message={x} own={x.sender === currentUser?._id}/>
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea onChange={(e) => {setNewMessage(e.target.value)}}className="chatMessageInput" placeholder="Write!"></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div> </> : <span className="noConversationText">Open a conversation to start to chat.</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentUserId={currentUser._id} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
    </>
  )
}
