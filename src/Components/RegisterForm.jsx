import React, { useState } from "react";
import addImage from "../assets/img/addImage.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const image = e.target[3].files[0];

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      console.log(resp);

      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(resp.user, {
              displayName: username,
              username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", resp.user.uid), {
              uid: resp.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "usersChat", resp.user.uid), {});
            navigate("/");
            console.log(resp.user);
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 bg-white rounded-xl py-8 px-20">
        <span className="text-4xl font-bold text-creamDarker">
          Mamang Wangsaf
        </span>
        <span className="text-xl font-semibold text-creamDarker pb-5">
          Register
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center w-full"
        >
          <input
            type="text"
            placeholder="Username"
            className="border-b-2 text-text border-b-cream p-2 w-72"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-b-2 text-text border-b-cream p-2 w-72"
          />
          <input
            type="password"
            placeholder="Password at least 6 characters"
            className="border-b-2 text-text border-b-cream p-2 w-72"
          />
          <input type="file" id="file" style={{ display: "none" }} />
          <label
            htmlFor="file"
            className="text-text cursor-pointer flex flex-row justify-center items-center gap-3 "
          >
            <img src={addImage} alt="Add Image" width="32px" />
            <span className="text-sm"> Choose an Profile picture</span>
          </label>

          <button
            name="submit"
            className=" bg-primary w-1/3 text-text rounded p-2"
          >
            Sign up
          </button>
        </form>
        {err && <span>Something wrong</span>}
        <span className="text-text text-sm mt-2">
          You do have an account?
          <button onClick={handleLogin}>Login</button>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
