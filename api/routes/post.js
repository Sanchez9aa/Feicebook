const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

//create a post

router.post("/", async(req,res) =>{
  const newPost = Post(req.body)
  try{
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  }catch(err){
    res.status(500).json(err)
  }
})

//update a post

router.put('/:id', async(req,res)=>{
  const post = Post.findById(req.params.id)
  try{  
    if(post.userId === req.body.userId){
      await post.updateOne({$set:req.body})
      res.status(200).json('Post is now updated')
    }else{
      res.status(403).json("You only can update your owns posts")
    }
  }catch(err){
    res.status(500).json(err)
  }
})
//delete a post

router.delete('/:id', async(req,res)=>{
  const post = await Post.findById(req.params.id)
  console.log(post)
  try{  
    console.log(post.userId)
    console.log(req.body.userId)
    if(post.userId === req.body.userId){
      await post.deleteOne()
      res.status(200).json('Post is now deleted.')
    }else{
      res.status(403).json("You only can delete your owns posts.")
    }
  }catch(err){
    res.status(500).json(err)
  }
})

//like a post

router.put('/:id/like', async(req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    console.log(post)
    if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push:{likes:req.body.userId}})
      res.status(200).json("The post has been liked.")
    }else{
      await post.updateOne({$pull:{likes:req.body.userId}})
      res.status(200).json("Post has been disliked.")
    }
  }catch(err){
    res.status(500).send(err)
  }
})

//get a post

router.get('/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    const {createdAt, updatedAt, _id, userId, __v, ...other} = post._doc
    res.status(200).send(other)
  }catch(err){
    res.status(500).json(err)
  }
})

//get timeline post

router.get('/timeline/:userId', async (req, res) => {
  try{
    console.log("Getting timeline")
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({userId: currentUser._id})
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) =>{
        const post = Post.find({userId:friendId})
        return Post.find({userId:friendId})
      })
    )
    res.status(200).json(userPosts.concat(...friendPosts))
  }catch(err){
    res.status(500).json(err)
  }

})

//get user all post

router.get('/profile/:username', async (req, res) => {
  try{
    console.log("Getting profile post")
    const user = await User.findOne({username:req.params.username})
    const posts = await Post.find({userId: user._id})
    res.status(200).json(posts)
  }catch(err){
    res.status(500).json(err)
  }

})

module.exports = router