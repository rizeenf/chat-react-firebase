import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatsContext } from "../Context/ChatsContext";
import { db } from "../firebase";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const { userLogin } = useContext(AuthContext);
  const { dispatch } = useContext(ChatsContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "usersChat", userLogin.uid), (doc) => {
        doc.exists() && setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    userLogin.uid && getChats();
  }, [userLogin.uid]);

  const handleClick = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div>
      {Object.entries(chats)?.map((doc) => (
        <div
          className="flex flex-row items-center gap-2 p-2 cursor-pointer hover:bg-creamDark"
          key={doc[0]}
          onClick={() => handleClick(doc[1].userInfo)}
        >
          <img
            src={doc[1].userInfo.photoURL}
            className=" w-8 h-8 object-cover rounded-full "
          />
          <div className=" flex flex-col">
            <span className="text-md font-bold">
              {doc[1].userInfo.displayName}
            </span>
            <span className=" text-sm text-text">
              {/* {doc[1].userInfo.displayName} */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
