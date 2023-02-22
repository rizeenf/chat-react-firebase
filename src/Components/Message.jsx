import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatsContext } from "../Context/ChatsContext";

const Message = ({ message }) => {
  const { userLogin } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex justify-start items-end gap-3 mx-2 ${
        message.senderId === userLogin.uid ? "owner" : ""
      }`}
    >
      <div className=" flex flex-col">
        <img
          src={
            message.senderId === userLogin.uid
              ? userLogin.photoURL
              : data.user.photoURL
          }
          className=" h-10 w-10 rounded-full object-cover"
        />
        <span className=" text-text text-sm">now</span>
      </div>
      <div className=" flex flex-col  p-2 rounded-xl  my-2">
        <p className=" bg-creamDark rounded-xl  p-2 px-5 my-1 rounded-bl-none max-w-max">
          {message.text}
        </p>
        {message.img && (
          <img
            src={message.img}
            className={`" h-1/2 w-1/2 object-cover rounded-md rounded-bl-none ${
              message.senderId === userLogin.uid ? "imageOwner" : ""
            } "`}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
