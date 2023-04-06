/**
 * @설명 회원탈퇴 헤더 텍스트
 * @작성자 김상훈
 * @일자 2023.04.05.
 * @내용 회원탈퇴 헤더 텍스트
 * @todo auth 에서 닉네임 가져와 ~님에 입력
 */
const WithdrawalInformation = () => {
  return (
    <>
      <div>
        <h1 style={h1Text}>카페인중독자님,</h1>
        <h1 style={h1Text}>여기는 <span style={colorText}>회원 탈퇴</span>를 위한 화면입니다.</h1>
      </div>
    </>
  )

}
const h1Text = {
  color: '#121212',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '26px',
  letterSpacing: '-0.025em',
}
const colorText = {
  color: '#6E8DBA'
}

export default WithdrawalInformation