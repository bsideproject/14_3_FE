import { useState } from "react"

const FindPassword = () => {
  const [findEmail, setFindEmail] = useState<string>('')
  const [findEmailVerify, setFindEmailVerify] = useState<boolean>(false)

  const handleFindEmail = ():void => { //keyup 
    if (findEmail.length < 4) {
      
    }
  }
  const submitForm = (e:any):void => { //submit
    e.prevent.default()
  }
  return (
    <>
      <div>
        <h4>아이디를 잊어버리셨나요?</h4>
        <p>이메일을 작성해주시면, 새로운 비밀번호를 발급해드려요</p>
        <div>
          <form action="submitForm">
            <input type="email" value={findEmail} onKeyUp={handleFindEmail} />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default FindPassword