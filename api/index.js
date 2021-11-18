const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const chatRoute = require('./routes/chat')
const messageRoute = require('./routes/messages')

const app = express();

dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
  console.log('Database Conexión Established')
});

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/chats', chatRoute)
app.use('/api/messages', messageRoute)

PORT = process.env.PORT


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})