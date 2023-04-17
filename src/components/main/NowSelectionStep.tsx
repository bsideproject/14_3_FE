import { useEffect, useState } from "react"
import 'assets/components/card-select-main/nowSelectionStep.css'
const stepList = [{index: 1}, {index: 2}, {index: 3}];
/**
 * @설명 잔여 질문뽑기 횟수 안내
 * @작성자 김상훈
 * @일자 2023.04.10.
 * @내용 잔여 질문뽑기 횟수 안내
 */
const NowSelectionStep = () => {
  const [nowSelectionStep, setSelectionStep] = useState<number>(2);
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
  })
  return (
    <>
      <div className="leftselection-wrap">
        <div className="leftselection-title">
          <p className="wgray12 body3-bold">현재 질문 뽑기 회차</p>
        </div>
        <div className="leftselection-numbers-wrap">
          {
            stepList.map(item => (
              <Step i={item.index} nowStep={nowSelectionStep} key={item.index}/>
            ))
          }
        </div>
      </div>    
    </>
  )
}

export const Step = ({i, nowStep}:STEP) => {
  return (
    <>
      <div className="leftselection-dotted caption1-bold"
        style={{'backgroundColor': i === nowStep ? '#6E8DBA' : '#FFFFFF'}}
      >
        <p className="caption1-bold" style={{'color': i === nowStep ? '#E9E7E2':'#7A7670'}}
          >{i}회</p>
      </div>
    </>
  )
}
type STEP = {
  i: number //index
  nowStep: number //현재회차
}
export default NowSelectionStep