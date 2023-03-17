import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Links</h1>
      <Link to="/login">Login</Link><br/>
      <Link to="/register">Register</Link><br/>
      <Link to="/mypage">mypage</Link><br/>
      <Link to="/password-check">password-check</Link><br/>
    </div>
  );
}

export default App;

