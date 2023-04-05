import 'assets/components/alertTextPopup.css'
/**
 * @설명 알럿창 컴포넌트(공통)
 * @작성자 김상훈
 * @생성일자 2023.04.05.
 * @Todo parameter 공통 처리
 * @param text{string} 출력할 텍스트 내용
 * @param setStatus{Function} useState function boolean
 */
const AlertTextPopup = ({text, setStatus}:TYPE_ALERT) => {
  const handleAlert = () => {
    setStatus(false)
  }
  return (
    <>
      <div className="alert-bg" id='alertModal'>
        <div className='padding-x-24'>
          <div className="modal">
            <div className="modal-text-area">
              <p>{text}</p>
            </div>
            <div className="modal-btn-area">
              <button type="button" onClick={handleAlert}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}
type TYPE_ALERT = {
  text: string
  setStatus: Function
}

export default AlertTextPopup