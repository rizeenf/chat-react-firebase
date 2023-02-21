import React, { useContext, useState } from "react";
import File from "../assets/img/attach.png";
import Img from "../assets/img/addImage.png";
import { AuthContext } from "../Context/AuthContext";
import { ChatsContext } from "../Context/ChatsContext";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const { userLogin } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: uuid(),
                text,
                senderId: userLogin.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: userLogin.uid,
          date: Timestamp.now(),
        }),
      });
    }

    setFile(null);
    setText("");
  };

  const handleEnter = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="flex flex-row justify-between items-center bg-creamDark h-[10%] w-full px-5">
      <input
        onKeyUp={handleEnter}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type something.. "
        className=" bg-creamDark w-full mx-1 p-2 placeholder:text-text placeholder:text-sm border-b-[1px] text-sm border-white"
      />

      <div className="flex flex-row gap-1 justify-center items-center p-2 ">
        <form
          action=""
          className=" flex flex-row justify-center items-center gap-2"
        >
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
          />
          <label
            htmlFor="file"
            className=" w-8 h-8 cursor-pointer  rounded-lg hover:bg-cream"
          >
            <img src={File} alt="Add File" />
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
          />
          <label
            htmlFor="file"
            className=" w-8 h-8 cursor-pointer rounded-lg hover:bg-cream"
          >
            <img src={Img} />
          </label>
        </form>

        <button
          onClick={handleSend}
          className="bg-creamDarker mx-2 p-3 text-white rounded-md hover:bg-cream"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
