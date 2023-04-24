import { useEffect, useState } from "react"
import 'assets/components/card-select-main/nowSelectionStep.css'
import useCardState from "store/modules/CardState";
import { useNavigate } from "react-router-dom";
const stepList = [{index: 1}, {index: 2}, {index: 3}];
/**
 * @설명 잔여 질문뽑기 횟수 안내
 * @작성자 김상훈
 * @일자 2023.04.10.
 * @내용 잔여 질문뽑기 횟수 안내
 */
const NowSelectionStep = () => {
  const navigate = useNavigate()
  const [nowSelectionStep, setSelectionStep] = useState<number>(1);
  const {todayCardSelectStep, getCardSelectStep, getFourSelectCards} = useCardState()  //card State - zustand 사용하기
  
  useEffect(()=>{   
    // 금일 남은 답변 횟수 가져오기 [1-3]
    const email = ''
    getCardSelectStep(email)  //질문회차 조회

    let todayAnswerStep = todayCardSelectStep ? todayCardSelectStep : 1 //로그인하지 않았을 경우도 들어올 수 있음 
    setSelectionStep(todayAnswerStep)
    
    //TODO: db에서 값이 주어지지 않을 경우, 전체 카드 검색 조회로 분기처리 
    console.log(todayCardSelectStep)
    //3번 모두 답변했을 경우
    //3번 미만 답변 혹은 처음 방문일 경우
    getFourSelectCards()

    
  },[])
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