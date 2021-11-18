const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

//Register
router.post('/register', async (req, res) => {
  try {
    //Check if user exist
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (user) return res.status(400).json({ message: "That email is already registered", succes: false })

    //Generate password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    //Save User
    await newUser.save()

    //Respond User
    res.send({ message: "Created", success: true }).status(201)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    //Check if user exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({ message: "Email not founded", success: false })

    //Checking if passwords are the same 
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    console.log('hola 1')
    if (!validPassword) return res.status(400).json({ message: "Wrong Password", success: false })
    console.log('hola 2')

    //Respond User
    res.status(200).json({ user, succes: true })
  } catch (err) {
    console.log('hola error')
    res.status(500).json(err)
  }
})



module.exports = router