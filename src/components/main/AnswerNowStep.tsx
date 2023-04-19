import { useEffect, useState } from "react"

const AnswerNowStep = () => {
  const [nowSelectionStep, setSelectionStep] = useState<number>(1);
  const [stepText, setStepText] = useState<string>('');
  

  useEffect(()=>{
    let todayAnswerStep = 1;  //기본 세팅

    // 금일 남은 답변 횟수 가져오기 [1-3]
    //const result = fetch('/api/getSelectionStep')     //질문회차 조회

    //3번 모두 답변했을 경우
    //if(result < 1) {  
    //  navigate('/my-calendar-list', {replace: true})  //현재페이지를 대체
    //} else {
     setSelectionStep(todayAnswerStep)               //질문회차 값 세팅
    //}
    switch (nowSelectionStep) {
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