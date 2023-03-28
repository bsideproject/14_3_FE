import { useState } from "react"

const FindEmail = () => {
  const [findName, setFindName] = useState<string>('')
  const [findNameVerify, setFindNameVerify] = useState<boolean>(false)

  const handleFindName = ():void => { //keyup 
    if (findName.length < 4) {

    }
  }
  const submitForm = (e:any):void => { //submit
    e.prevent.default()
  }
  return (
    <>
      <div>
        <h4>아이디를 잊어버리셨나요?</h4>
        <p>저희 고밍의 아이디는 이메일로 되어있어요</p>
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