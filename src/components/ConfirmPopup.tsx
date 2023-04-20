import 'assets/components/alertTextPopup.css'
/**
 * @설명 확인 팝업 창
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {string} strongText 강조 text 내용
 * @param {string} text text 내용
 * @param {string} confirmText 예 
 * @param {string} cancelText 아니오
 * @param {Function} callbackFunction 확인 콜백 함수
 * @param {Function} closeCallbackFuntion 아니오 콜백 함수
 * @param {boolean} isFlex flex style 지정 여부
 */
const ConfirmPopup = (
  {strongText, text, confirmText='네', cancelText='아니오', callbackFunction, closeCallbackFuntion, isFlex=true}
  : CONFIRM_POPUP
  ) => {
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
            {/* 강조 텍스트 */}
            <div className='headline3' style={{textAlign:'center', marginBottom:'12px'}}>
              {strongText}
            </div>
            {/* 일반 텍스트 */}
            <div className='modal-text-area'>
              <p>{text}</p>
            </div>
            {/* isFlex 전달여부에 따라 flex-direction 처리 */}
            <div className={'confirm-btn-area ' + (isFlex && ('btns-isflex'))}>
              {/* 취소 */}
              <button className='modal-btn-confirm-cancel body3-bold' type="button" onClick={closeConfirmPopup}>{cancelText}</button>
              {/* 확인 */}
              <button className='modal-btn-confirm body3-bold' type="button" onClick={confirmCheck}>{confirmText}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
type CONFIRM_POPUP = {
  strongText?: string
  text?: string
  confirmText?: string
  cancelText?: string
  callbackFunction: Function
  closeCallbackFuntion: Function
  isFlex?: boolean
}

export default ConfirmPopup