import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatsContext } from "../Context/ChatsContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [message, setMessage] = useState([]);
  const { data } = useContext(ChatsContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessage(doc.data().message);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className=" flex flex-col h-full overflow-y-scroll scroll-smooth">
      {message.map((msg) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default Messages;
