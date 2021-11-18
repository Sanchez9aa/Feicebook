const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

//Update User

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(12)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id,
        {
          $set: req.body,
        });
      res.status(202).json("Account has been updated")
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can update only your account")
  }
})

//Delete User

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {

      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted")
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can delete only your account")
  }
})


//Get an user

router.get("/", async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username })
    const { password, updateAt, isAdmin, ...other } = user._doc
    console.log(other)
    res.status(200).json(other)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get friends

router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    console.log("User", user)
    const friends = await Promise.all(
      user.following.map(followerId => {
        return User.findById(followerId)
      })
    )
    let friendList = []
    friends.map(follower => {
      const { _id, username, profilePicture } = follower
      friendList.push({ _id, username, profilePicture })
    })
    res.status(200).send(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Follow an user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.some((x) => x === req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json('User has benn followed')
      } else {
        res.status(403).json('You already follow this user.')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You can't follow yourself")
  }
})

//Unfollow an user

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.some((x) => x === req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })
        res.status(200).json('User has benn unfollowed')
      } else {
        res.status(403).json('You dont follow this user.')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You can't follow yourself")
  }
})




module.exports = router