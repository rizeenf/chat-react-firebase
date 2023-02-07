import { useContext, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { userLogin } = useContext(AuthContext);

  const ProtectedPages = ({ children }) => {
    if (!userLogin) {
      return <Navigate to="/login" />;
    }

    if (userLogin) {
      console.log(userLogin.email);
      return children;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <ProtectedPages>
              <Home />
            </ProtectedPages>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
