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

const removeUser = (userId) => {
  const index = users.findIndex(x => x.userId === userId)
  console.log(index)
  if (index !== -1){
   return users.splice(index, 1)
  }
}

const getUser = (userId) => {
  users.find(user=> user.userId === userId)
}

io.on("connection", (socket) => {
  //user connect
  console.log("an user conencted")
  
  //getting userid and socket id
  socket.on("addUser", userId=>{
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  console.log(users)
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(receiverId)
    console.log(senderId, text)
    io.to(user.socketId).emit("getMessage", {
      senderId, text,
    })
  })

  //user disconnect
  socket.on("setDesconexion", (userId)=>{
    console.log("an user have been disconnected")
    console.log(users)
    removeUser(userId)
    /* io.emit("getUsers", users) */
    console.log(users)
  })

  console.log(users)

})