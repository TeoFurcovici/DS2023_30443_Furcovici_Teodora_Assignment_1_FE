import { useEffect, useState } from "react";
import { ChatMessage, ReceiveMsgRequest, Empty } from "../../output/chat_pb";
import "./ChatPage.css";
import Chat from "../Chat/Chat";
import { toast } from 'react-toastify'
import UsersList from "../UsersList/UsersList";

toast.configure()
export default function ChatPage({ client,usernameProp,userRoleProps }) {
    const [users, setUsers] = useState([]);
    const [msgList, setMsgList] = useState([]);
    const username =usernameProp;
    const [message, setMessage] = useState('');
    var counter=0;
  
    const handleMessageChange = event => {
      toast("User " + username +" is typing a message...", { position: toast.POSITION.TOP_RIGHT })
    };

    useEffect(() => {
      const strRq = new ReceiveMsgRequest();
      strRq.setUser(username);
      var chatStream = client.receiveMsg(strRq, {});
      chatStream.on("data", (response) => {
        const from = response.getFrom();
        const msg = response.getMsg();
        const time = response.getTime();
        if(msg != "typing"){
          if (from === username) {
            setMsgList((oldArray) => [
              ...oldArray,
              { from, msg, time, mine: true },
            ]);
          } else {
            setMsgList((oldArray) => [...oldArray, { from, msg, time }]);
          }
        }
      });
  
      chatStream.on("status", function (status) {
        console.log(status.code, status.details, status.metadata);
      });
  
      chatStream.on("end", () => {
        console.log("Stream ended.");
      });
    }, []);
  
    useEffect(() => {
      getAllUsers();
    }, []);

    useEffect(() => {
      const strRq = new ReceiveMsgRequest();
      strRq.setUser(username);
  
      
      var chatStream = client.receiveIsUserTyping(strRq, {});
      chatStream.on("data", (response) => {
        const from = response.getFrom();
        const msg = response.getMsg();
        const time = response.getTime();
        if(from != username){
          toast("User " + from +" is typing a message...", { position: toast.POSITION.TOP_RIGHT })
        }
      });
  
      chatStream.on("status", function (status) {
        console.log(status.code, status.details, status.metadata);
      });
  
      chatStream.on("end", () => {
        console.log("Stream ended.");
      });
    }, []);
  
    function getAllUsers() {
      client.getAllUsers(new Empty(), null, (err, response) => {
        let usersList = response?.getUsersList() || [];
        usersList = usersList
          .map((user) => {
            return {
              id: user.array[0],
              name: user.array[1],
            };
          })
          .filter((u) => u.name !== username);
        setUsers(usersList);
      });
    }
  
    function sendMessage(message) {
      const msg = new ChatMessage();
      msg.setMsg(message);
      msg.setFrom(username);
      msg.setTime(new Date().toLocaleString());
  
      client.sendMsg(msg, null, (err, response) => {
        console.log(response);
      });
    }

    function typing() {
      const msg = new ChatMessage();
      msg.setMsg("typing");
      msg.setFrom(username);
  
      client.isUserTyping(msg, null, (err, response) => {
        console.log(response);
      });
    }
  
  
    return (
      <div className="chatpage">
        <div className="userslist-section">
          <div
            style={{ paddingBottom: "4px", borderBottom: "1px solid darkgray" }}
          >
            <div className="btn-refreshParent">
              <button className="btn-refresh" onClick={getAllUsers}>REFRESH</button>
            </div>
            <div>
              <span>
                Logged in as <b>{username}</b>
              </span>
            </div>
          </div>
          <UsersList users={users} />
        </div>
        <div className="chatpage-section">
          <Chat msgList={msgList} sendMessage={sendMessage} isTypingProp={typing} userRoleChat={userRoleProps} username={usernameProp}/>
        </div>
      </div>
    );
  }