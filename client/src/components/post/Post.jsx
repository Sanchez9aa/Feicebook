import './post.css'
import {MoreVert} from "@material-ui/icons"
import { useState, useEffect } from 'react'
import {format} from 'timeago.js'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Post({post}) {

  const {REACT_APP_PUBLIC_FOLDER} = process.env

  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState([])
  const auth = useSelector((state) => state)
  const currentUser = auth.auth.user
  
  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser() 
  },[post.userId, post])

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id, post.likes])
    

  const likeHandler = () => {
    try{
      axios.put('/posts/' + post._id + "/like", {userId:currentUser._id})
    }catch(err){
      console.log(err)
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img className="postProfileImg" src={user.profilePicture ? `${REACT_APP_PUBLIC_FOLDER}perfil/${user.profilePicture}` : `${REACT_APP_PUBLIC_FOLDER}perfil/noavatar.png`} alt="" />
            </Link>  
              <span className="postUsername">{user.username}</span>                          
              <span className="postDate">{format(post.createAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${REACT_APP_PUBLIC_FOLDER}posts/${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  )
}
