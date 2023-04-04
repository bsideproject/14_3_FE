import React from 'react';
import { Link } from 'react-router-dom';
import 'assets/font/font.css'

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
    </div>
  );
}

export default App;

