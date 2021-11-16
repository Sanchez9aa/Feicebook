const io = require("socket.io")(8900, {
  cors:{
    origin: "http://localhost:3000",
  },
})

let users = [];

const addUser = (userId, socketId) => {
  !users.some(user=>user.userId === userId) && 
    users.push({userId, socketId})
}

const removeUser = (socketId) => {
  console.log("socketId " + socketId)
  console.log("users.socketId " + users.socketId)
  console.log("users " + users)
  console.log("users.filter " + users.filter((user) => user.socketId !== socketId))
  return users.filter((user) => user.socketId !== socketId)
  
}

const getUser = (userId) => {
  return users.find(user=> user.userId === userId)
}

io.on("connection", (socket) => {
  //user connect
  console.log("an user conencted")
  
  //getting userid and socket id
  socket.on("addUser", userId=>{
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(receiverId)
    console.log(senderId, text)
    io.to(user.socketId).emit("getMessage", {
      senderId, text,
    })
  })

  //user disconnect
  socket.on("disconnect", ()=>{
    console.log("an user have been disconnected")
    removeUser(socket.id)
    io.emit("getUsers", users)
  })

  console.log(users)

})