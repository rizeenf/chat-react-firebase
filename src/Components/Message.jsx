import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatsContext } from "../Context/ChatsContext";

const Message = ({ message }) => {
  const { userLogin } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  return (
    <div className=" flex justify-start items-end gap-3 mx-2 owner">
      {/* <div className=" flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
          alt="Profil image"
          className=" h-10 w-10 rounded-full object-cover"
        />
        <span className=" text-text text-sm">3s ago</span>
      </div>
      <div className=" flex flex-col  p-2 rounded-xl  my-2">
        <p className=" bg-creamDark rounded-xl  p-2 px-5 my-1 rounded-bl-none max-w-max">
          How's it going maaaaaaaaaaaaaaaaaaaan?
        </p>
        <img
          src="https://images.unsplash.com/photo-1671190364502-466fc6272306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          alt="Profil image"
          className=" h-1/2 w-1/2 object-cover rounded-md rounded-bl-none imageOwner"
        />
      </div> */}
    </div>
  );
};

export default Message;
