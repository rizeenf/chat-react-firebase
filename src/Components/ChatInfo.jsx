import React, { useContext } from "react";
import Add from "../assets/img/add.png";
import Cam from "../assets/img/cam.png";
import More from "../assets/img/more.png";
import { ChatsContext } from "../Context/ChatsContext";

const ChatInfo = () => {
  const { data } = useContext(ChatsContext);

  return (
    <div className=" bg-creamDarker flex flex-row justify-between p-3 items-center">
      <div className=" flex flex-row items-center gap-3 ">
        <img src={data?.user.photoURL} className=" h-10 w-10 rounded-full" />
        <span className=" font-semibold text-md text-text">
          {data?.user.displayName}
        </span>
      </div>
      <div className=" flex flex-row items-center">
        <img
          src={Add}
          alt="Add Contacts"
          className=" w-8 h-8 cursor-pointer hover:bg-cream"
        />
        <img
          src={Cam}
          alt="Video call"
          className=" w-8 h-8 cursor-pointer hover:bg-cream"
        />
        <img
          src={More}
          alt="More Info"
          className=" w-8 h-8 cursor-pointer hover:bg-cream"
        />
      </div>
    </div>
  );
};

export default ChatInfo;
