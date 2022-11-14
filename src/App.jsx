import { useState } from "react";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (message.length < 1) {
      return;
    }
    setMessageList([...messageList, message]);
    setMessage("");
  }

  return (
    <div className="container">
      <div className="header">
        <header>
          <h1>Chat App</h1>
        </header>
        <span>X</span>
      </div>
      <div className="message-container">
        {messageList.map((message) => (
          <div key={message} className={"sender message"}>
            <p>{message}</p>
          </div>
        ))}
      </div>
      <div className="send-message">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="send-messsage"
            id="send-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send!</button>
        </form>
      </div>
    </div>
  );
}
