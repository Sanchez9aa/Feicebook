import "./message.css";
import { format } from "timeago.js";

const Message = ({ message, own, senderPP, receiver }) => {
  const { REACT_APP_PUBLIC_FOLDER } = process.env;
  return (
    <div className={own ? "message" : "message own"}>
      <div className="messageTop">
        {own ? (
          <img
            src={`${REACT_APP_PUBLIC_FOLDER}/perfil/${receiver}`}
            alt=""
            className="messageImg"
          />
        ) : (
          <img
            src={`${REACT_APP_PUBLIC_FOLDER}/perfil/${senderPP}`}
            alt=""
            className="messageImg"
          />
        )}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
