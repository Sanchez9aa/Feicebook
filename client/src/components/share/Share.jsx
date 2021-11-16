import './share.css'
import React, {useRef, useState} from 'react'
import {PermMedia, Label, Room, EmojiEmotions} from '@material-ui/icons'
import {useSelector} from 'react-redux'
import axios from 'axios'

const Share = () => {

  const auth = useSelector(state => state)
  const {user} = auth.auth
  const desc = useRef()
  const [file, setFile] = useState(null)

  const {REACT_APP_PUBLIC_FOLDER} = process.env

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    try{
      await axios.post('/posts', newPost)
      desc.current.value = ""
    }catch(err){
      console.log(err)
    }
  } 

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? `${REACT_APP_PUBLIC_FOLDER}perfil/${user.profilePicture}` : `${REACT_APP_PUBLIC_FOLDER}perfil/noavatar.png`} alt="" />
          <input 
            placeholder="What's in your mind?" 
            className="shareInput" 
            ref={desc}/>
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor={file} className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo Or Video</span>
              <input 
                style={{display: "none"}} 
                type="file" 
                id="file" 
                accept=".png,.jpeg,.jpg" 
                onChange={(e) => setFile(e.target.files[0])}/>
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share