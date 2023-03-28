import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Mypage from "pages/mypage/Mypage";
import PasswordCheck from "pages/mypage/PasswordCheck";
import LostInfo from "pages/auth/LostInfo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/lost-info" element={<LostInfo />} />
        <Route path="/password-check" element={<PasswordCheck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
