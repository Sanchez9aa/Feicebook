import "./message.css"
import {format} from 'timeago.js'

export default function Message({message, own}) {
  const {REACT_APP_PUBLIC_FOLDER} = process.env
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img 
          src={`${REACT_APP_PUBLIC_FOLDER}/perfil/1.jpg`} 
          alt="" 
          className="messageImg" />
        <p className="messageText">{message.text}
        </p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
