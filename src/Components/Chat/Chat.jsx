import "./Chat.css";
import { toast } from 'react-toastify'
import {useState} from 'react';

toast.configure()
export default function Chat({ msgList, sendMessage,isTypingProp,userRoleChat,username }) {
    const [message, setMessage] = useState('');
    const [counter, setCounter] = useState(0);
  function handler() {
    var msg = window.msgTextArea.value;
    sendMessage(msg);
    window.msgTextArea.value = "";
  }

  function handlerTyping(e) {
    if(e.target.value != "" && counter==0){
      isTypingProp();
      setCounter(1);
    }
    if(e.target.value == ""){
      setCounter(0)
    }
  }

  const handleMessageChange = event => {
    if (userRoleChat=="false" && counter==0){
        toast("User " + username +" is typing a message...", { position: toast.POSITION.TOP_RIGHT })
        counter++;
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h3>Group Messages</h3>
      </div>
      <div className="chat-list">
        {msgList?.map((chat, i) => (
          <ChatCard chat={chat} key={i} />
        ))}
      </div>
      <div className="chat-input">
        <div style={{ flex: "3 1 90%" }}>
          <textarea onChange={e => handlerTyping(e)} id="msgTextArea" />
        </div>
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button className="btn-send" onClick={handler}>Send</button>
        </div>
      </div>
    </div>
  );
}

function ChatCard({ chat }) {
  return (
    <>
      <div style={{ fontSize: "9px", marginLeft: "4px", paddingLeft: "8px" }}>
        <span>{chat?.from}</span>
      </div>
      <div
        className={
          chat?.mine ? "chatcard chatcard-mine" : "chatcard chatcard-friend"
        }
      >
        <div className="chatcard-msg">
          <span>{chat?.msg}</span>
        </div>
        <div className="chatcard-time">
          <span>{chat?.time}</span>
        </div>
      </div>
    </>
  );
}