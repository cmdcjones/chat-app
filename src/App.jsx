import { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  limit,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "prefab-drake-368701.firebaseapp.com",
  projectId: "prefab-drake-368701",
  storageBucket: "prefab-drake-368701.appspot.com",
  messagingSenderId: "1058777133685",
  appId: "1:1058777133685:web:dc4d9a1e72e9a368cb3e3c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messageRef = collection(db, "messages");
const q = query(messageRef, orderBy("createdAt", "desc"), limit(20));
signInAnonymously(auth);

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <header>
          <h1>Superchat</h1>
        </header>
      </div>
      <ChatContainer />
    </div>
  );
}

function ChatContainer() {
  const [message, setMessage] = useState("");
  const [messages, loading, error, snapshot] = useCollectionData(q, {
    initialValue: ["Loading..."],
    idField: "id",
  });

  const inputBox = document.getElementById("send-message");

  function handleMessageSend(e) {
    e.preventDefault();
    addData();
    setMessage("");
    inputBox.focus();
  }

  async function addData() {
    try {
      await addDoc(collection(db, "messages"), {
        message: message,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  return (
    <>
      <div className="message-container">
        {messages[0] === "Loading..." ? (
          <p>Loading...</p>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} msg={msg} />)
        )}
      </div>
      <div className="send-message">
        <form onSubmit={(e) => handleMessageSend(e)}>
          <input
            type="text"
            name="send-messsage"
            id="send-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button disabled={!message}>Send!</button>
        </form>
      </div>
    </>
  );
}

function ChatMessage({ msg }) {
  const { message, uid } = msg;

  const messageType = uid === auth.currentUser.uid ? "sender" : "receiver";

  return (
    <div className={"message " + messageType}>
      <p>{message}</p>
    </div>
  );
}
