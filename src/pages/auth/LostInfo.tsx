import { useEffect, useState } from "react"
import 'assets/pages/auth/lostInfo.css'
import ToastPopup from "components/ToastPopup";
import { useNavigate } from "react-router-dom";
import useDefaultSets from "store/modules/Defaults";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LostInfo = () => {
  const {setHeaderText} = useDefaultSets()
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('')
  const [emailFormChk, setEmailFormChk] = useState<boolean>(false) //* 이메일 형식체크
  const [emailVerify, setEmailVerify] = useState<boolean>(false)
  const [toastAlert, setToastAlert] = useState<boolean>(false)

  // 이메일로 비밀번호 초기화 보내기 
  const submitEmail = (e:any):void => {
    e.preventDefault()
    if (emailVerify === true && emailFormChk === true) {
      // fetch  axios~~~
      const rst = true
      if (rst === true) { //결과
        setToastAlert(true)
        updateToastPopup()
      } else { //이메일이 존재하지 않을 때
        alert('존재하지 않는 이메일입니다. 다시 확인해주세요')
      }
    }
  }
 const handleEmailBlur = () => { //focusout 
    setEmailFormChk(emailRegex.test(email)) //이메일형식체크
  }
  const handleEmailValue = ({target}:any) => { //keyup
    setEmail(target.value)
    if(target.value < 4) {
      setEmailVerify(false)
    } else {
      setEmailVerify(true)
    }
  }

  // 로그인 페이지로 이동
  const goToLogin = () => {
    navigate('/login')
  }

  //toastpopup 3초 제어
  const updateToastPopup = () => {
    setTimeout(() => {
      setToastAlert(false)
    }, 3000);
  }

  useEffect(() => {
    setHeaderText('비밀번호 찾기')
  },[])

  return (
    <>
          <form onSubmit={submitEmail}>
            <div className='inputArea'>
              <label htmlFor="email" className='login-label-text text-color'>이메일</label>
              <input type="email" autoComplete="true"  className='input-style'  placeholder='이메일 주소를 입력해주세요' id="email" value={email} onBlur={handleEmailBlur} onChange={handleEmailValue} maxLength={30} /><br />
            </div>
            <div className='lostinfo-btn-area'>
              <button type="submit" className='btn reset-password-btn'>비밀번호 초기화</button>
              <button type="button" className='btn goto-login-btn' onClick={()=>goToLogin()}>로그인하러 가기</button>
            </div>
            <div>
              <p className="find-id-caption-text caption1-regular">
                *비밀번호 초기화 버튼 클릭 시 기존에 설정한 비밀번호가 초기화되며, 회원가입 시 등록한 메일로 임시비밀번호를 전송해 드립니다.
              </p>
              <p className="find-id-caption-text caption1-regular">
                *임시비밀번호를 받지 못 했을 경우, 스팸메일함 혹은 프로모션함을 확인하시거나 비밀번호 초기화 버튼을 다시 한 번 눌러주세요.
              </p>
            </div>
          </form>
      {
        toastAlert === true ? (
          <ToastPopup text={"이메일로 임시 비밀번호가 전송되었습니다!"} bgColor={"#4D99DE"} textColor={"#FFFFFF"} />
        ) : ''
      }
    </>
  )
}

export default LostInfo