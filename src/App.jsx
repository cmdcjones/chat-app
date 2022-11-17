import { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  limit,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
} from "firebase/firestore";
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

export default function App() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputBox = document.getElementById("send-message");

  useEffect(() => {
    signInAnonymously(auth).then(() => {
      console.log(`Signed in as: ${auth.currentUser.uid}`);
    });

    async function getData() {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((message) => {
        setMessageList((messages) => [...messages, message.data()]);
      });
    }
    getData();
  }, []);

  function handleMessageSend(e) {
    e.preventDefault();
    if (message.length < 1) {
      return;
    }
    addData();
    setMessage("");
    inputBox.focus();
  }

  async function addData() {
    try {
      await addDoc(messageRef, {
        message: message,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      console.log(
        `Document written with - ID: ${messageRef.id} MSG: ${message} UID: ${auth.currentUser.uid}`
      );
    } catch (e) {
      console.log("Error adding document: ", e);
    }
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
          <p>{message.message}</p>
        ))}
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
          <button>Send!</button>
        </form>
      </div>
    </div>
  );
}
