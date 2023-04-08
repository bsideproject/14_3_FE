import 'assets/components/alertTextPopup.css'
/**
 * @설명 알럿창 컴포넌트(공통)
 * @작성자 김상훈
 * @생성일자 2023.04.05.
 * @Todo parameter 공통 처리
 * @param {string} text 출력할 텍스트 내용
 * @param {Function} callbackFunction 호출할 콜백함수
 */
const AlertTextPopup = ({text, text2, callbackFunction}:TYPE_ALERT) => {
  return (
    <>
      <div className="alert-bg" id='alertModal'>
        <div className='padding-x-24 relative'>
          <div className="modal">
            <div className="modal-text-area">
              <p>{text}</p>
              {text2 ? (<><br/><p>{text2}</p></>) : ''}
            </div>
            <div className="modal-btn-area">
              <button type="button" onClick={()=>callbackFunction()}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}
type TYPE_ALERT = {
  text: string
  text2: string|null
  callbackFunction: Function
}

export default AlertTextPopup