import { useState } from "react";
import "./App.css";

export default function App() {
  const messageOne = {
    user: "sender",
    message: "hello",
  };

  const messageTwo = {
    user: "receiver",
    message: "reply",
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
          <p key={message.user} className={message.user}>
            {message.message}
          </p>
        ))}
      </div>
    </div>
  );
}
