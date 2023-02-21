import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const SearchBar = () => {
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { userLogin } = useContext(AuthContext);

  const handleChange = async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", searchUser)
    );

    try {
      const qSnapshot = await getDocs(q);
      qSnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err.message);
    }
  };

  const handleSelect = async () => {
    const combinedId =
      userLogin.uid > user.uid
        ? userLogin.uid + user.uid
        : user.uid + userLogin.uid;

    try {
      const resp = await getDoc(doc(db, "chats", combinedId));

      if (!resp.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          message: [],
        });

        await updateDoc(doc(db, "usersChat", userLogin.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.username,
            username: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "usersChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userLogin.uid,
            displayName: userLogin.displayName,
            username: userLogin.displayName,
            photoURL: userLogin.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("oke");
      }
    } catch (error) {
      setErr(true);
      console.log(error.message);
    }
    setSearchUser("");
    setUser(null);
  };

  return (
    <div className="flex justify-center flex-col">
      <input
        type="text"
        placeholder="Search username.."
        className=" bg-cream my-1 mx-3 p-2 placeholder:text-text placeholder:text-sm border-b-[1px] text-sm border-white"
        onChange={(e) => setSearchUser(e.target.value)}
        onKeyUp={handleChange}
        value={searchUser}
      />
      {err && <span>User not found</span>}
      {user && (
        <div
          onClick={handleSelect}
          className="flex flex-row items-center gap-2 p-2 border-b-[1px] cursor-pointer border-white"
        >
          <img
            src={user.photoURL}
            alt="Img Profil"
            className=" w-8 h-8 object-cover rounded-full "
          />
          <div className=" flex flex-col">
            <span className="text-md font-bold">{user.username}</span>
            <span className=" text-sm text-text"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
