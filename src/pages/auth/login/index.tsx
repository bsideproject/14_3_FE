/***
 * @desc 로그인 페이지
 * @작성자 김상훈
 * @date 2023.03.08. 수요일
 */
import React, { useState } from 'react';
import useAuthStore from '@store/modules/Auth';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () =>{
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailVerify, setEmailVerify] = useState<boolean>(false)
  const [passwordVerify, setPasswordVerify] = useState<boolean>(false)

  const loginAttempt = async (e:any): Promise<void> => {
    e.preventDefault()
    if (email.toString().length < 1) { //email 유효성 검사
      setEmailVerify(false)
      alert('이메일을 입력해주세요')
      document.getElementById('email')?.focus()
      return ;
    } else {
      setEmailVerify(true)
    }
    if (password.toString().length < 4) { //비밀번호 유효성 검사
      setPasswordVerify(false)
      alert('비밀번호는 4자리수 이상입니다')
      document.getElementById('password')?.focus()
      return ;
    } else {
      setPasswordVerify(true)
    }
    if (emailVerify === true && passwordVerify === true) { //유효성 검사 통과 시 로그인 로직
      // const result = await axios.post('/api/login', {email,password,loginAt: new Date()})
      const result = {
        status: true,
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

  const handleEmailValue = (e:any) => {
    setEmail(e.target.value)
  }
  const handlePasswordValue = (e:any) => {
    setPassword(e.target.value)
  }
  const kakaoLogin = () => {
    alert('sns로그인은 현재 미구현 상태입니다.')
  }

  return (
    <>
      <div>
        <form onSubmit={loginAttempt}>
          <input type="email" placeholder='type email' id="email" onChange={handleEmailValue} onKeyUp={handleEmailValue} maxLength={30} /><br />
          <input type="password" placeholder='type password' id="password" onChange={handlePasswordValue} onKeyUp={handlePasswordValue} maxLength={30} /><br/>
          <button type="submit">로그인</button><br/>

          <button type="button" onClick={kakaoLogin}>Kakao Login Btn</button><br />
          <button type="button">회원가입</button><br/>
        </form>
      </div>
    </>
  )
}

export default Login