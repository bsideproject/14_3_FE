/**
 * @설명 알럿창 컴포넌트(공통)
 * @작성자 김상훈
 * @생성일자 2023.03.31.
 * @Todo parameter 공통 처리
 * @param text(필수) 출력할 텍스트 내용
 * @param bgColor(기본 흰색) 알럿창 배경색
 * @param textColor(기본 검정) 알럿창 글자색
 */
const AlertText = ( {text, bgColor='white', textColor='black'}:ALERT ) => {
  const styleAlertText = {
    backgroundColor: `${bgColor}`,
    borderRadius: '8px',
    color: `${textColor}`,
    padding: '17px 16px 17px 16px',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    letter: '-2.5%',
    maxWidth: '100%',
    margin: '0 auto',
  } as React.CSSProperties;

  const styleAlertCoverDiv = {
    position: 'absolute',
    bottom: '64px',
    width: '380px',
    height: '64px',
    zIndex: '2',
    alignItems: 'center',
  } as React.CSSProperties;

  return (
    <>
      <div style={styleAlertCoverDiv}>
        <div style={styleAlertText}>
          <span>{text}</span>
        </div>
      </div>
    </>
  ) 
}


type ALERT = {
  text: string
  bgColor: string
  textColor: string
}
export default AlertText