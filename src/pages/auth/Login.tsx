import React, { useEffect, useState } from 'react';
import useAuthStore from '@store/modules/Auth';
import { Link, useNavigate } from 'react-router-dom';
/**
 * @설명 로그인 페이지
 * @작성자 김상훈
 * @일자 2023.03.08. 수요일
 * @내용 비밀번호 확인 후 이동
 * @TODO backend-connection
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Login:React.FC = () =>{
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailVerify, setEmailVerify] = useState<boolean>(false)
  const [passwordVerify, setPasswordVerify] = useState<boolean>(false)
  const [rememberEmail, setRememberEmail] = useState<boolean>(true) //id저장여부 확인
  const [emailFormChk, setEmailFormChk] = useState<boolean>(false); //* 이메일 형식체크

  useEffect(()=>{ //useEffect 사용
    if (localStorage.getItem('bside-remember-login')) { //로컬스토리지에서 email 가져오기
      const LSrememberEmail:string = String(localStorage.getItem('bside-remember-login'))
      if (LSrememberEmail.length > 0) {
        setEmail(LSrememberEmail)
        setEmailVerify(true)
        setEmailFormChk(true)
        document.getElementById('password')?.focus()
      }
    }
  },[])

  const loginAttempt = async (e:any): Promise<void> => {
    e.preventDefault()
    if (email.length < 1) { //email 유효성 검사
      setEmailVerify(false)
      alert('이메일을 입력해주세요')
      document.getElementById('email')?.focus()
      return ;
    } 

    if (password.length < 4) { //비밀번호 유효성 검사
      setPasswordVerify(false)
      alert('비밀번호는 4자리수 이상입니다')
      document.getElementById('password')?.focus()
      return ;
    }

    if (emailVerify === true && passwordVerify === true && emailFormChk === true) { //유효성 검사 통과 시 로그인 로직
      checkRememberEmail()
      // const result = await axios.post('/api/login', {email,password,loginAt: new Date()})
      const result = {
        status: false,
        userInfo: {}
      }
      if (result?.status === true) { //이후 형식 지정
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // useAuthStore(state => state.updateLoginStatus(result.status, result.userInfo))  //1. state 상태 변경 
        navigate('/main')//2. main page로 이동 : Main으로 이동 : 추후 경로 변경 필요
      }
    } else {
      alert('아이디 혹은 비밀번호를 확인해주세요')
    }
  }

  const checkRememberEmail = () => { //이메일 저장 로컬스토리지에 설정
   if (rememberEmail === true) {
    localStorage.setItem('bside-remember-login', email)
   } 
  }

  const handleEmailValue = ({target}:any) => { //keyup
    setEmail(target.value)
    if(email.length < 4) {
      setEmailVerify(false)
    } else {
      setEmailVerify(true)
    }
  }
  const handleEmailBlur = () => { //focusout 
    setEmailFormChk(emailRegex.test(email)) //이메일형식체크
  }

  const handlePasswordValue = (e:any) => {
    setPassword(e.target.value)
    if(password.length > 4) {
      setPasswordVerify(true)
    }
  }
  const kakaoLogin = () => {
    alert('sns로그인은 현재 미구현 상태입니다.')
  }
  const handleRememberEmail = ({target}:any) => {
    setRememberEmail(!rememberEmail)
  }

  return (
    <>
      <div>
        <h3>Login</h3>
        <form onSubmit={loginAttempt}>
          <input type="email" placeholder='type email' id="email" value={email} onBlur={handleEmailBlur} onChange={handleEmailValue} maxLength={30} /><br />
          <input type="password" placeholder='type password' id="password" value={password} onChange={handlePasswordValue} onKeyUp={handlePasswordValue} maxLength={30} /><br/>
          <input type="checkbox" name="rememberme" id="rememberId" checked={rememberEmail} onChange={handleRememberEmail} />
          <label htmlFor="rememberId">ID저장</label><br></br><br></br>
          <button type="submit">로그인</button><br/>

          <button type="button" onClick={kakaoLogin}>Kakao Login Btn</button><br />
          <div><Link to="/lost-info">아이디/비밀번호 찾기</Link></div>
          <button type="button">회원가입</button><br/>
        </form>
      </div>
    </>
  )
}

export default Login