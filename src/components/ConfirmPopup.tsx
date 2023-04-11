import 'assets/components/alertTextPopup.css'
/**
 * @설명 확인 팝업 창
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {string} text text 내용
 * @param {Function} callbackFunction 확인 콜백 함수
 * @param {Function} closeCallbackFuntion 아니오 콜백 함수
 */
const ConfirmPopup = ({text, callbackFunction, closeCallbackFuntion}: CONFIRM_POPUP) => {
  // '네'를 눌렀을 경우
  const confirmCheck = () => {
    callbackFunction()
  }

  // 아니오를 눌렀을 경우
  const closeConfirmPopup = () => {
    closeCallbackFuntion()
  }
  
  return (
    <>
      <div className='alert-bg'> 
        <div className='padding-x-24 relative'>
          <div className='confirm-modal'>
            <div className='modal-text-area'>
              <p>{text}</p>
            </div>
            <div className='confirm-btn-area'>
              <button className='modal-btn-confirm' type="button" onClick={confirmCheck}>네</button>
              <button className='modal-btn-confirm-cancel' type="button" onClick={closeConfirmPopup}>아니오</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
type CONFIRM_POPUP = {
  text: string
  callbackFunction: Function
  closeCallbackFuntion: Function
}

export default ConfirmPopup