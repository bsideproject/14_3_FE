import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Mypage from "pages/mypage/Mypage";
import PasswordCheck from "pages/mypage/PasswordCheck";
import LostInfo from "pages/auth/LostInfo";
import GlobalStyle from 'assets/GlobalStyles'
import MyPageCategoryList from "pages/mypage/MyPageCategoryList";
import WithdrawalMain from "pages/mypage/WithdrawalMain";
import MainContent from "pages/MainContent";
import OnePagerMain from "pages/onpager/OnePagerMain";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <div className="container">
        <div className="inside-container">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage-category" element={<MyPageCategoryList />} />
            <Route path="/lost-info" element={<LostInfo />} />
            <Route path="/password-check" element={<PasswordCheck />} />
            <Route path="/withdrawal" element={<WithdrawalMain />} />
            <Route path="/main" element={<MainContent />} />
            <Route path="/onepager" element={<OnePagerMain />} />
            
          </Routes>

        </div>

      </div>
    </BrowserRouter>
  </React.StrictMode>
);
