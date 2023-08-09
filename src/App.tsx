import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "assets/font/font.css";
import Intro from "pages/etc/Intro";
import useAuthStore from "store/modules/Auth";


function App() {  
  const { isLogin } = useAuthStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    //islogin을 확인한다.
    //로그인이 되어있으면 메인화면으로 이동
    //로그인이 안되어있으면 로그인화면으로 이동
    if (isLogin) {
      navigate('/main') //임시주석
    }
  }, []);

  return (
    <Intro />
    // <div className="App">
    //   <h1>Links</h1>
    //   <Link to="/login">Login</Link>
    //   <br />
    //   <Link to="/register">Register</Link>
    //   <br />
    //   <Link to="/mypage">mypage</Link>
    //   <br />
    //   <Link to="/mypage-category">mypage-category</Link>
    //   <br />
    //   <Link to="/password-check">password-check</Link>
    //   <br />
    //   <Link to="/lost-info">lostinfo</Link>
    //   <br />
    //   <Link to="/withdrawal">회원탈퇴</Link>
    //   <br />
    //   <Link to="/main">메인화면(UI완료)</Link>
    //   <br />
    //   <Link to="/onepager">원페이저(미완료)</Link>
    //   <br />
    //   <Link to="/answered-list">메인화면-답변한목록</Link>
    //   <br />
    //   <Link to="/intro">인트로</Link>
    //   <br />
    //   <Link to="/loading">로딩</Link>
    //   <br />
    // </div>
  )
}

export default App;
