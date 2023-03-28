import FindEmail from "components/auth/lost-info/FindEmail"
import FindPassword from "components/auth/lost-info/FindePassword"

const LostInfo = () => {


  return (
    <>
      <h3>아이디/비밀번호 찾기</h3>
      <div>
       <FindEmail />{/* 이메일 찾기 */}
       <FindPassword />{/* 비밀번호 찾기 */}
      </div>
    </>
  )
}

export default LostInfo