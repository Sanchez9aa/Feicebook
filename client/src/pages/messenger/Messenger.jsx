import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/messages/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [gotMessage, setGotMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiver, setReceiver] = useState();
  const [receiverPP, setReceiverPP] = useState();

  const socket = useRef();
  const ScrollRef = useRef();

  const auth = useSelector((state) => state);
  const currentUser = auth.auth.user;

  /* Handling socketio basic config + real time messaging */
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setGotMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    ScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    gotMessage &&
      currentChat?.members.includes(gotMessage.sender) &&
      setMessages((prev) => [...prev, gotMessage]);
  }, [gotMessage, currentChat]);

  /* Handling users online and conversations*/
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.following.filter((x) => users.some((y) => y.userId === x))
      );
    });
    const getConversations = async () => {
      try {
        const res = await axios.get("/chats/" + currentUser._id);
        const ids = res.data[0].members
          .map((x) => x)
          .find((x) => x !== currentUser._id);
        setReceiver(ids);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser]);

  /* Getting receiver ProfilePicture */
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/user?userId=" + receiver);
        console.log(res.data);
        setReceiverPP(res.data.profilePicture);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [receiver]);

  /* Getting all messages from a chat */
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  /* Handling sending messages */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: currentUser._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            Menu
            <input
              type="text"
              placeholder="Search Friends"
              className="chatMenuInput"
            />
            {conversations.map((x) => (
              <div onClick={() => setCurrentChat(x)}>
                <Conversation conversation={x} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((x) => (
                    <div ref={ScrollRef}>
                      <Message
                        senderPP={currentUser.profilePicture}
                        receiver={receiverPP}
                        message={x}
                        own={x.sender === currentUser?._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    className="chatMessageInput"
                    placeholder="Write!"
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start to chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={currentUser._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
