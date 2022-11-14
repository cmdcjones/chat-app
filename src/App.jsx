import { useState } from "react";
import "./App.css";

export default function App() {
  const messageOne = {
    user: "sender",
    message: "Hello, there.",
  };

  const messageTwo = {
    user: "receiver",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem laudantium unde facilis impedit eaque! Amet quidem nulla dolorum architecto sequi tempore natus hic dolor voluptas consequatur? Ab, dolores sint?",
  };

  const messageList = [messageOne, messageTwo];

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
          <div key={message.user} className={message.user + " message"}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
