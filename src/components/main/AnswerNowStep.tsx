import { useEffect, useState } from "react"
import useCardState from "store/modules/CardState";

/**
 * @설명 N번째 질문 텍스트
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const AnswerNowStep = () => {
  const [nowSelectionStep, setSelectionStep] = useState<number>(1);
  const [stepText, setStepText] = useState<string>('');
  const {todayCardSelectStep} = useCardState()   //카드 뽑기 단계 조회

  useEffect(()=>{
    //3번 모두 답변했을 경우
    //if(result < 1) {  
    //  navigate('/my-calendar-list', {replace: true})  //현재페이지를 대체
    //} else {
     setSelectionStep(todayCardSelectStep)               //질문회차 값 세팅
    //}
    switch (todayCardSelectStep) {
    case 1: setStepText('첫'); break;
    case 2: setStepText('두'); break;
    case 3: setStepText('세'); break;
    default: setStepText('첫'); break;
  }
  },[])

  return (
    <>
      <div style={{width: '59px', height: '16px', padding: '4px 8px', color:'#3D3938', fontStyle:'normal', fontWeight:400, fontSize:'12px', lineHeight:'16px', letterSpacing:'-0.025em', marginTop:'24px', marginLeft:'16px', borderRadius:'4px', background:'#E9E7E2', textAlign:'center',  }}>
        {stepText}번째 질문
      </div>
    </>
  )
}

export default AnswerNowStep