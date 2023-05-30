import 'assets/components/card-select-main/nowSelectionStep.css'
const stepList = [{index: 1}, {index: 2}, {index: 3}];

/**
 * @설명 잔여 질문뽑기 횟수 안내
 * @작성자 김상훈
 * @일자 2023.04.10.
 * @내용 잔여 질문뽑기 횟수 안내
 */
const NowSelectionStep = ({nowStep}: OBJ_NUMBER) => {
  return (
    <>
      <div className="leftselection-wrap">
        <div className="leftselection-title">
          <p className="color-wgray12 body3-bold">현재 질문 뽑기 회차</p>
        </div>
        <div className="leftselection-numbers-wrap">
          {
            stepList.map(item => (
              <Step i={item.index} nowStep={nowStep} key={item.index}/>
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
type OBJ_NUMBER = {
  nowStep: number //현재회차
}
export default NowSelectionStep