import Header from "components/auth/Header"
import { useState } from "react"
import 'assets/pages/auth/lostInfo.css'
import AlertText from "components/AlertText";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LostInfo = () => {
  const [email, setEmail] = useState<string>('')
  const [emailFormChk, setEmailFormChk] = useState<boolean>(false) //* 이메일 형식체크
  const [emailVerify, setEmailVerify] = useState<boolean>(false)

  const submitEmail = (e:any):void => {
    e.preventDefault()
  }
 const handleEmailBlur = () => { //focusout 
    setEmailFormChk(emailRegex.test(email)) //이메일형식체크
  }
  const handleEmailValue = ({target}:any) => { //keyup
    setEmail(target.value)
    if(email.length < 4) {
      setEmailVerify(false)
    } else {
      setEmailVerify(true)
    }
  }
  return (
    <>
      <div className="container">
        <Header />
        <h1 className='startGomingText text-color'>비밀번호 찾기</h1>
        <form onSubmit={submitEmail}>
          <div className='inputArea'>
            <label htmlFor="email" className='login-label-text text-color'>이메일</label>
            <input type="email" className='input-style'  placeholder='이메일 주소를 입력해주세요' id="email" value={email} onBlur={handleEmailBlur} onChange={handleEmailValue} maxLength={30} /><br />
          </div>
          <div className='login-btn-area'>
            <button type="submit" className='btn reset-password-btn'>비밀번호 초기화하기</button>
            <button type="submit" className='btn goto-login-btn'>로그인 하러가기</button>
          </div>
          <div>
            <p className="find-id-caption-text">
              *비밀번호 초기화 버튼 클릭시 기존에 설정하신 비밀번호가 초기화되며, 로그인하실 수 있는 임시 비밀번호가 등록된 메일로 전송됩니다.
            </p>
            <p className="find-id-caption-text">
              *임시 비밀번호가 확인되지 않을시 스팸메일함 혹은 포르모션함을 확인해보시고 다시 한번 '비밀번호 초기화' 버튼을 눌러보세요.
            </p>
          </div>
        </form>
      </div>
      <AlertText text={"이메일로 임시 비밀번호가 전송되었습니다!"} duration={0} bgColor={""} textColor={""} />
    </>
  )
}

export default LostInfo