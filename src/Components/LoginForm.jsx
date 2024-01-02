import React, { useState } from "react";
import addImage from "../assets/img/addImage.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [login, setLogin] = useState(false);
  const [err, setErr] = useState(false);
  const [respErr, setRespErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      console.log("success");

      setLogin(true);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setErr(true);
      setRespErr("Error :", err.message);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 bg-white rounded-xl py-8 px-20">
        <span className="text-4xl font-bold text-creamDarker">MWatsapp</span>
        <span className="text-xl font-semibold text-creamDarker pb-5">
          Log in
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center w-full"
        >
          <input
            type="email"
            placeholder="Email"
            className="border-b-2 text-text border-b-cream p-2 w-72"
            required
            minLength={10}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-b-2 text-text border-b-cream p-2 w-72"
            required
            minLength={6}
          />

          <button
            name="submit"
            className=" bg-primary w-1/3 text-text rounded p-2 hover:bg-creamDarker"
          >
            Log in
          </button>
        </form>
        {err && <span>{respErr}</span>}
        <span className="text-text text-sm mt-2 ">
          You don't have an account?
          <button className="hover:text-creamDarker" onClick={handleRegister}>
            Register
          </button>
        </span>
        <span className="text-text text-sm mt-2">
          How it works : <br />- Create 2 account <br />- Chat each other
          (search username)
          <br />
          <span className="text-xs">
            Demo account: <br />
            - demoaccount2@gmail.com / demoaccount2 <br />
            - demoaccount3@gmail.com / demoaccount2 <br />
            - demoaccount4@gmail.com / demoaccount2 <br />
          </span>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
