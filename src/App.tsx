import React from 'react';
import { Link } from 'react-router-dom';
import 'assets/font/font.css'
import MyCalendar from 'components/main/MyCalendar';

function App() {
  return (
    <div className="App">
      <h1>Links</h1>
      <Link to="/login">Login</Link><br/>
      <Link to="/register">Register</Link><br/>
      <Link to="/mypage">mypage</Link><br/>
      <Link to="/mypage-category">mypage-category</Link><br/>
      <Link to="/password-check">password-check</Link><br/>
      <Link to="/lost-info">lostinfo</Link><br/>
      <Link to="/withdrawal">회원탈퇴</Link><br/>
      <Link to="/main">메인화면(UI완료)</Link><br/>
      <Link to="/onepager">원페이저(미완료)</Link><br/>
      <Link to="/answered-list">메인화면-답변한목록</Link><br/>
      <Link to="/intro">인트로</Link><br/>

      
    </div>
  );
}

export default App;

