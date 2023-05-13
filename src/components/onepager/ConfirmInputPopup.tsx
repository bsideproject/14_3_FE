import { useEffect, useState } from "react"
import LineBreak from "utils/lineBreak"
import 'assets/components/onepager/confirmpopup.css'
import InputBox from "components/common/InputBox"
import useAuthStore from "store/modules/Auth"

/**
 * @desc 원페이저에서 사용, input이 존재하는 confirm popup
 * @작성자 김상훈
 * @작성일자 2023.05.05.
 * @param {string} text
 * @param {string} confirmText
 * @param {string} cancelText
 * @param {Function} confirmCallbackFunction
 * @param {Function} cancelCallbackFunction
 * 
 */
const ConfirmInputPopup = ({text, confirmText, cancelText, confirmCallbackFunction, cancelCallbackFunction}:CONFIRM_INPUT_POPUP) => {
  const {userInfo} = useAuthStore(state => state)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [email, setEmail] = useState<string>(userInfo.eml)
  const [emailChk, setEmailChk] = useState<boolean>(true) //이메일형식체크결과

  //email-onchange
  const handleEmail = ({target}:any) => {
    setEmail(target.value)
  }

  //이메일 형식에 맞는지 확인, 콜백 호출
  const beforeConfirmCallbackFunction = () => {
    if ( emailRegex.test(email) === true ) {
      confirmCallbackFunction(email)
    } else {
      setEmailChk(false)
      return false
    }
  }

  return (
    <>
      <div className="ConfirmInputPopup-b-wrap">
        <div className="ConfirmInputPopup-wrap">
          <div className="ConfirmInputPopup-content">

            {/* 텍스트 */}
            <div className="ConfirmInputPopup-textwrap body2-regular">
              {LineBreak(text)} {/* 개행처리추가 */}
            </div>
            <div className="ConfirmInputPopup-inputwrap">
              <label htmlFor="email" className="body3-bold">이메일 주소</label>
              <input 
                id="email" type="email" 
                placeholder="이메일을 입력해주세요" 
                value={email} 
                onChange={handleEmail}
                onKeyUp={() => setEmailChk(true)}
                className={'confirmpopup-input body3-regular' + (!emailChk ? ' input-error' : ' ConfirmInputPopup-input')}
              />
              { !emailChk ? 
                  <p className="caption2-bold">이메일 주소를 다시 한번 입력해주세요</p>
                : <></>
              }
            </div>
            <div className="ConfirmInputPopup-btnwrap">
              <button 
                type="button" className="btn-p-l body3-bold" 
                onClick={()=>beforeConfirmCallbackFunction()}
              >
                {confirmText}
              </button>

              <button 
                type="button" className="btn-s-l body3-bold" 
                onClick={()=>cancelCallbackFunction()}
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type CONFIRM_INPUT_POPUP = {
  text: string
  confirmText: string
  cancelText: string
  confirmCallbackFunction: Function
  cancelCallbackFunction: Function
}

export default ConfirmInputPopup