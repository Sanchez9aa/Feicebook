const router = require('express').Router()
const Conversation = require('../models/Conversation')

//New Conversation

router.post("/", async (req,res) => {
  const newConversation = new Conversation({
    members:[req.body.senderId, req.body.receiverId],
  })
  try{
    const savedConversation = await newConversation.save()
    res.status(201).json(savedConversation)
  }catch(err){
    res.status(500).json(err)
  }
})

//GET Chat of a user

router.get("/:userID", async (req,res) => {
  try{
    const chat = await Conversation.find({
      members:{$in: [req.params.userID]},
    })
    res.status(200).json(chat)
  }catch(err){
    console.log(err)
  }
})

//GET chats with 2 users id

router.get("/find/:firstUserId/:secondUserId"), async (req, res) => {
  try{
    const chat = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId]},
    })
    res.status(200).json(chat)
  }catch(err){
    res.status(500).json(err)
  }
}


module.exports = router