import testRegisterStore from "store/modules/TestRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Mypage: React.FC = () => {
  const { registerInfo, updateId } = testRegisterStore((state) => state);
  const [email, setEmail] = useState<string>(registerInfo[0].email);
  const [nickName, setNickName] = useState<string>(registerInfo[0].nickName);
  const [password, setPassword] = useState<string>(registerInfo[0].password);
  const [birthDt, setBirthDt] = useState<string>(registerInfo[0].birthDt);
  const [gender, setGender] = useState<boolean>(registerInfo[0].gender);
  const [modifyStatus, setModifyStatus] = useState<boolean>(false); // *true : 수정상태, false: 조회상태
  const [passwordLengthChk, setpasswordLengthChk] = useState<boolean>(true);
  const [nickNameLengthChk, setNickNameLengthChk] = useState<boolean>(true);
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(true); //* 닉네임 중복체크 미개발

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

  const handleModify = () => {
    setModifyStatus(true);
  };
  const handleComplete = () => {
    if (!nickName) {
      alert("닉네임을 입력하세요.");
      document.getElementById("nickName")?.focus();
    } else if (!passwordLengthChk) {
      alert("비밀번호 길이가 짧습니다(4글자이상).");
      document.getElementById("password")?.focus();
    } else if (!nickNameLengthChk) {
      alert("닉네임 길이가 짧습니다(4글자이상)");
      document.getElementById("nickName")?.focus();
    } else if (!nickNameExistChk) {
      alert("중복된 닉네임입니다.");
      document.getElementById("email")?.focus();
    } else {
      alert("회원정보가 변경되었습니다.");
      updateId(nickName, password, 0);
      setModifyStatus(false);
    }
  };
  const handleCheck = () => {
    console.log(registerInfo);
  };
  return (
    <>
      <div>
        <div placeholder="이메일" id="email">
          {email}
        </div>
        <br />
        <input
          type="password"
          placeholder="비밀번호 입력"
          id="password"
          style={{ background: passwordLengthChk ? "" : "red" }}
          onChange={handlePasswordUpdate}
          onBlur={handlePasswordBlur}
          value={password}
          readOnly={modifyStatus ? false : true}
          maxLength={30}
        />
        <br />
        <input
          type="text"
          placeholder="닉네임"
          id="nickName"
          style={{ background: nickNameLengthChk ? "" : "red" }}
          onChange={handlenickNameUpdate}
          onBlur={handleNickNameBlur}
          value={nickName}
          readOnly={modifyStatus ? false : true}
          maxLength={30}
        />
        <button type="button">중복 체크(미구현)</button>
        <br />
        <div>생년월일 : {birthDt}</div>
        <br />
        <div>성별 : {gender === true ? "남자" : "여자"}</div>
        <br />
        {/* <button type="button">저장</button> */}
        {modifyStatus === false ? (
          <button type="button" onClick={handleModify}>
            회원정보수정
          </button>
        ) : (
          <button type="button" onClick={handleComplete}>
            완료
          </button>
        )}
        <button type="button" onClick={handleCheck}>
          만들어진 회원 체크
        </button>
      </div>
    </>
  );
};
export default Mypage;
