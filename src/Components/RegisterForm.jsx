import React, { useState } from "react";
import addImage from "../assets/img/addImage.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [err, setErr] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.error("Error", error);
          setErr(true);
          setIsRegistered(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "usersChat", res.user.uid), {});

            setIsRegistered(true);
            console.log("Success Register");

            setTimeout(() => {
              navigate("/login");
            }, 1000);
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
        <span className="text-4xl font-bold text-creamDarker">MWatsapp</span>
        <span className="text-xl font-semibold text-creamDarker pb-5">
          Register
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center w-full"
        >
          <input
            type="text"
            placeholder="Display Name"
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

          <label
            htmlFor="file"
            className="text-text cursor-pointer flex flex-row justify-center items-center gap-3 "
          >
            <img src={addImage} alt="Add Image" width="32px" />
            <span className="text-sm">
              <input
                type="file"
                id="file"
                accept="image/*"
                className="border-b-2 text-text border-b-cream w-60"
              />
            </span>
          </label>

          <button
            name="submit"
            className=" bg-primary w-1/3 text-text rounded p-2 hover:bg-creamDarker"
          >
            Sign up
          </button>
        </form>
        {err && <span>Something wrong</span>}
        {isRegistered && (
          <span>Success Registered, redirecting to login page..</span>
        )}
        <span className="text-text text-sm mt-2">
          You do have an account?
          <button className="hover:text-creamDarker" onClick={handleLogin}>
            Login
          </button>
        </span>
        <span className="text-text text-sm mt-2">
          How it works : <br />- Create 2 account <br />- Chat each other
          (search username)
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
