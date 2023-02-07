import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserLogin(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
