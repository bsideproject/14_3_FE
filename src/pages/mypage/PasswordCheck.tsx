import { useEffect, useState } from "react"
import useAuthStore from 'store/modules/Auth'
import axios from "axios";
import { useNavigate } from "react-router-dom";
/**
 * @설명 마이페이지 - 비밀번호 확인
 * @작성자 김상훈
 * @일자 2023.03.17. 금요일
 * @내용 비밀번호 확인 후 이동
 * @TODO backend-connection
 */
const PasswordCheck: React.FC = () => {
  const navigate = useNavigate()
  const { isLogin, userInfo } = useAuthStore((state) => state)
  const [password, setPassword] = useState<string>('');
  const [passwordVerify, setPasswrodVerify] = useState<boolean>(true);

  //미로그인 시 로그인 화면으로 이동
  useEffect(() => { 
    if (!isLogin) { 
      //navigate('/login') //임시주석
    }
  })
  
  //유효성 검사 이벤트
  const handlePassword = ():void => { 
    if( password.length < 4 ) {
      setPasswrodVerify(false)
    } else {
      setPasswrodVerify(true)
    }
  }

  //유효성 검사 -> 계정정보 확인 프로세스
  const verifyCheck = async ():Promise<void> => { 
    if (!passwordVerify) {
      alert('비밀번호는 4자리 이상입니다.')
    } else {
      //계정정보 확인 
      // const rst = await axios.post('/selectMyPagePassword', 
      //   {usr_no: userInfo.usr_no, password: password}
      // )
      // if (rst.status === 'success') { //일치확인
      //   navigate('/MyPage')
      // } else {
      //   alert('비밀번호가 일치하지 않습니다.')
      // }
    }
  }
  
  return (
    <>
      <div>
        <h3>비밀번호 확인</h3>
        <input type="password" 
          value={password} 
          onKeyUp={handlePassword}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ background: passwordVerify ? "" : "tomato" }} 
          onBlur={handlePassword}
          maxLength={30}
          />
          <button type="button" onClick={verifyCheck}>confirm</button>
      </div>
    </>
  )
}

export default PasswordCheck