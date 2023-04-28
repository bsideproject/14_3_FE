import WithdrawalInformation from "./WithdrawalInformation"

/**
 * @설명 회원탈퇴 세번째 페이지의 내용 컴포넌트
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {number} step 단계 
 * @param {Function} setStep useState의 setStep 함수 
 */
const Withdrawal3 = ({step, setStep}: WITHDRAWAL) => {
  return (
    <>
      <div className='withdrawal-content'>
        {/* 회원탈퇴 공통 텍스트 */}
        <WithdrawalInformation /> 
        <div className='body2-bold withdrawal-content-info'>
          <p className='word-break-keep-all mb-12'>
            그동안 고밍을 사용하시면서<br/>
            ‘나’를 돌아보고 하루하루를 의미있는 습관으로<br/>
            채워나가는 경험을 하셨길 바랍니다. 
          </p>
          <p className='withdrawal-font-size-16 word-break-keep-all' style={{marginTop: '12px'}}>
            마지막으로 고밍에게 남기고 싶은 말씀이 있다면 남겨주세요 :) 
          </p>

          {/* textarea  */}
          <div style={{marginTop: '12px'}}>
            <textarea 
              id="withdrawalTextarea"
              className="body3-regular withdrawal-textarea" cols={30} rows={10} 
              placeholder="글자 수 제한없이, 고밍에게 하고 싶은 말을 자유롭게 남겨 주세요.&#13;&#10;좋았던 점, 개선되었으면 하는 점 등, 뭐든지 좋아요."
              maxLength={150} 
              ></textarea>
          </div>

          <div className='withdrawal-button-area'>
            <button className='withdrawal-button withdrawal-no' type="button" onClick={() => setStep(++step)}>탈퇴하기</button>
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
export default Withdrawal3