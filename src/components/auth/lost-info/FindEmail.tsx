import { useState } from "react"

const FindEmail = () => {
  const [findName, setFindName] = useState<string>('')
  const [findNameVerify, setFindNameVerify] = useState<boolean>(false)


  const handleFindName = ():void => { //keyup : 유효성
    if (findNameVerify === false) {
      if (findName.length > 4) {
        setFindNameVerify(true)
      } 
    } else if (findNameVerify === true) {
      if (findName.length < 4) {
        setFindNameVerify(false)
      } 

    }
  }
  const submitForm = (e:any):void => { //submit
    e.prevent.default()
    if (findName.length < 1) {
      alert('닉네임 혹은 이름을 작성해주세요')
      return ;
    } else {
      //axios~
    }
  }
  return (
    <>
      <div>
        <h4>아이디를 잊어버리셨나요?</h4>
        <p>고밍의 아이디는 이메일로 되어있어요</p>
        <div>
          <form action="submitForm">
            <input type="text" value={findName} onKeyUp={handleFindName} />
            <input type="text" />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default FindEmail