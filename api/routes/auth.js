const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

//Register
router.post('/register', async (req,res) => {
  try{
  //Check if user exist

  //Generate password
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //Create new user
  const newUser = await new User({
    username:req.body.username,
    email:req.body.email,
    password:hashedPassword
  })

  //Save User
  await newUser.save()

  //Respond User
  res.send("Created").status(201)
  }catch(err){
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) =>{
  try{
    //Check if user exist
    const user = await User.findOne({email:req.body.email})
    console.log(user)
    !user && res.status(404).send('User not found')

    //Checking if passwords are the same 
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json('wrong password')

    res.status(200).json(user)
  }catch(err){
    res.status(500).json(err)
  }
})



module.exports = router