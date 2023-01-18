import { useState, useRef } from "react";
import Header from '../Header/Header';
import { User, JoinResponse } from "../../output/chat_pb";
import { ChatServiceClient } from "../../output/chat_grpc_web_pb";
import ChatPage from "../ChatPage/ChatPage";
import './ChatAdmin.css'

const client = new ChatServiceClient("http://localhost:8081", null, null);

export default function App({userRole}) {
  const inputRef = useRef(null);
  const [submitted, setSubmitted] = useState(null);
  const [username,setUsername]=useState("")
  function joinHandler() {
   const  _username = inputRef.current.value;

    const user = new User();
    user.setId(Date.now());
    user.setName(_username);
    setUsername(_username)

    client.join(user, null, (err, response) => {
      if (err) return console.log(err);
      const error = response.getError();
      const msg = response.getMsg();

      if (error === 1) {
        setSubmitted(true);
        return;
      }
      window.localStorage.setItem("username", _username.toString());
      setSubmitted(true);
    });
  }

  function renderChatPage() {
    return <ChatPage client={client} usernameProp={username}  userRoleProps={userRole}/>;
  }

  function renderJoinPage() {
    return (
      <div>
        <div>
          <h1>Join Chat As...</h1>
        </div>
        <div style={{ padding: "10px 0" }}>
          <input
            style={{ fontSize: "1.3rem" }}
            type="text"
            ref={inputRef}
            placeholder="Your username..."
          />
        </div>
        <div>
          <button className="btn-join" onClick={joinHandler}>
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <head>
        <title>ChatApp</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Header />
      <div className="container">
        <main className="main">
        {submitted ? renderChatPage() : renderJoinPage()}
        </main>
      </div>
    </>
  );
}