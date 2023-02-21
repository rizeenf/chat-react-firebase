import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import { ChatsContextProvider } from "./Context/ChatsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatsContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatsContextProvider>
  </AuthContextProvider>
);
