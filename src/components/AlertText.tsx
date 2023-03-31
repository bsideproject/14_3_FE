import { useEffect } from "react"

/**
 * @설명 알럿창 컴포넌트(공통). 3초후에 fade out 처리(예정)
 * @작성자 김상훈
 * @생성일자 2023.03.31.
 * @Todo parameter 공통 처리
 * @param text(필수) 출력할 텍스트 내용
 * @param duration(기본 3초) 지속시간
 * @param bgColor(기본 흰색) 알럿창 배경색
 * @param textColor(기본 검정) 알럿창 글자색
 */
const AlertText = ( {text, duration=3, bgColor='white', textColor='black'}:ALERT ) => {
  useEffect(() => {
    setTimeout(()=> {
      //사라지게 만들기
    }, duration)
  })
  const styleAlertText = {
    transition: '0.3s easeout',
    backgroundColor: `${bgColor}`,
    color: `${textColor}`,
    padding: '17px 44px 17px 53px',
    fontSize: '14px',
    
  }
  return (
    <>
      <div style={styleAlertText}>
        <span>!</span>
        <span>{text}</span>
      </div>
    </>
  ) 
}


type ALERT = {
  text: string
  duration: number
  bgColor: string
  textColor: string
}
export default AlertText