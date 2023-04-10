import { useNavigate } from 'react-router-dom'
import WithdrawalInformation from './WithdrawalInformation'
import 'assets/components/withdrawalComponents.css'
import bullet from 'assets/images/bullet.png'

/**
 * @설명 회원탈퇴 첫번째 페이지의 내용 컴포넌트
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {number} step 단계 
 * @param {Function} setStep useState의 setStep 함수 
 */
const Withdrawal1 = ({step, setStep}: WITHDRAWAL) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='withdrawal-content'>
        {/* 회원탈퇴 공통 텍스트 */}
        <WithdrawalInformation /> 
        {/* 본문 */}
        <div className='withdrawal-content-info'>
          <p className='withdrawal-font-size-16 color-wgray12'>
            고밍에서 작성하신 모든 질문과 그에 대한 답변이 삭제되며, 삭제된 정보는 다시 복구할 수 없습니다.
          </p>
          <p className='withdrawal-font-size-16 color-wgray12'  style={{marginTop: "24px"}}>
            탈퇴를 계속 진행하시겠습니까?
          </p>
          
          <p className='withdrawal-font-size-12 withdrawal-small-info'>
            <img src={bullet} alt="*" style={{marginRight: '4px'}} />
            탈퇴를 진행하시기 전, 간직하고 싶은 답변이 있다면, 나의 고밍 현황에서 그간의 기로글을 다운받아 주세요.
          </p>

          <div className='withdrawal-button-area'>
            <button className='withdrawal-button withdrawal-yes' type="button" onClick={() => setStep(++step)}>네</button>
            <button className='withdrawal-button withdrawal-no' type="button" onClick={() => navigate(-1)}>아니오</button>
          </div>
        </div>
      </div>
      </>
  )
}
type WITHDRAWAL = {
  step: number
  setStep: Function
}
export default Withdrawal1