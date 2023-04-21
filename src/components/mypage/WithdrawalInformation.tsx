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
        <h1 className="body1-bold color-wgray12">카페인중독자님,</h1>
        <h1 className="body1-bold color-wgray12">여기는 <span style={colorText}>회원 탈퇴</span>를 위한 화면입니다.</h1>
      </div>
    </>
  )

}

const colorText = {
  color: '#6E8DBA'
}

export default WithdrawalInformation