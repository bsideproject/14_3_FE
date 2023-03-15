import testRegisterStore from "store/modules/TestRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register: React.FC = () => {
  const { registerInfo, insertId } = testRegisterStore((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthDt, setBirthDt] = useState<string>("");
  const [gender, setGender] = useState<boolean>(true);
  const [emailFormChk, setEmailFormChk] = useState<boolean>(true); //* 이메일 형식체크만 개발완료
  const [emailExistChk, setEmailExistChk] = useState<boolean>(true); //* 이메일 중복체크 미개발
  const [passwordLengthChk, setpasswordLengthChk] = useState<boolean>(true);
  const [nickNameLengthChk, setNickNameLengthChk] = useState<boolean>(true);
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(true); //* 닉네임 중복체크 미개발

  function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailFormChk(emailRegex.test(email));
  }

  const getToday = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };
  const handleEmailUpdate = (e: any) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = (e: any) => {
    isValidEmail(email);
  };

  const handlePasswordBlur = (e: any) => {
    if (password.length < 4) {
      setpasswordLengthChk(false);
    } else {
      setpasswordLengthChk(true);
    }
  };
  const handleNickNameBlur = (e: any) => {
    if (nickName.length < 4) {
      setNickNameLengthChk(false);
    } else {
      setNickNameLengthChk(true);
    }
  };

  const handlePasswordUpdate = (e: any) => {
    setPassword(e.target.value);
  };

  const handlenickNameUpdate = (e: any) => {
    setNickName(e.target.value);
  };

  const handleBirthDateUpdate = (e: any) => {
    setBirthDt(e.target.value);
  };

  const handleEmailExistCheck = async (): Promise<void> => {
    if (!email) {
      alert("이메일을 입력하세요.");
    } else if (!emailFormChk) {
      alert("이메일형식이 올바르지 않습니다.");
    }
    // * 중복 체크 API

    // *
  };
  const handleGenderCheck = (e: any) => {
    setGender(e.target.value === "M" ? true : false);
  };
  const handleRegister = async (e: any): Promise<void> => {
    e.preventDefault();
    if (!email) {
      alert("이메일을 입력하세요.");
      document.getElementById("email")?.focus();
    } else if (!password) {
      alert("비밀번호를 입력하세요.");
      document.getElementById("password")?.focus();
    } else if (!nickName) {
      alert("닉네임을 입력하세요.");
      document.getElementById("nickName")?.focus();
    } else if (!birthDt) {
      alert("생년월일을 입력하세요.");
      document.getElementById("birthDt")?.focus();
    } else if (!emailFormChk) {
      alert("이메일형식이 올바르지 않습니다.");
      document.getElementById("email")?.focus();
    } else if (!passwordLengthChk) {
      alert("비밀번호 길이가 짧습니다(4글자이상).");
      document.getElementById("password")?.focus();
    } else if (!nickNameLengthChk) {
      alert("닉네임 길이가 짧습니다(4글자이상)");
      document.getElementById("nickName")?.focus();
    } else if (!emailExistChk) {
      alert("중복된 이메일입니다.");
      document.getElementById("email")?.focus();
    } else if (!nickNameExistChk) {
      alert("중복된 닉네임입니다.");
      document.getElementById("email")?.focus();
    } else {
      alert("회원가입이 되었습니다.");
      // navigate(`/login`);
      // const result = await axios.post('/api/register', {email,password,nickName,birthDt,gender})
      insertId({
        usr_no: registerInfo.length,
        email,
        nickName,
        password,
        gender,
        birthDt,
      });
    }
  };
  const handleCheck = () => {
    console.log(registerInfo);
  };
  return (
    <>
      <div>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="이메일 입력"
            id="email"
            onChange={handleEmailUpdate}
            onBlur={handleEmailBlur}
            value={email}
            style={{ background: emailFormChk ? "" : "red" }}
            maxLength={30}
          />
          <button type="button" onClick={handleEmailExistCheck}>
            중복체크
          </button>
          <br />
          <input
            type="password"
            placeholder="비밀번호 입력"
            id="password"
            style={{ background: passwordLengthChk ? "" : "red" }}
            onChange={handlePasswordUpdate}
            onBlur={handlePasswordBlur}
            value={password}
            maxLength={30}
          />
          <br />
          <input
            type="text"
            placeholder="닉네임 입력"
            id="nickName"
            style={{ background: nickNameLengthChk ? "" : "red" }}
            onChange={handlenickNameUpdate}
            onBlur={handleNickNameBlur}
            value={nickName}
            maxLength={30}
          />
          <br />
          <input
            type="date"
            placeholder="생년월일 입력"
            id="birthDt"
            onChange={handleBirthDateUpdate}
            value={birthDt}
            max={getToday()}
          />
          <br />
          남자 :
          <input
            value="M"
            name="male"
            type="radio"
            checked={gender === true}
            onChange={handleGenderCheck}
          />
          여자 :
          <input
            value="F"
            name="feMale"
            type="radio"
            checked={gender === false}
            onChange={handleGenderCheck}
          />
          <br />
          <button type="submit">완료</button>
          <button type="button" onClick={handleCheck}>
            만들어진 회원 체크
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
