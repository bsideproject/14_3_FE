import testRegisterStore from "store/modules/TestRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/auth/Header";
import { InputActionMeta } from "react-select";
import SelectBox from "components/common/SelectBox";

const Mypage: React.FC = () => {
  const { registerInfo, updateId } = testRegisterStore((state) => state);
  const [email, setEmail] = useState<string>(registerInfo[0].email);
  const [nickName, setNickName] = useState<string>(registerInfo[0].nickName);
  const [password, setPassword] = useState<string>(registerInfo[0].password);
  const [birthDt, setBirthDt] = useState<string>(registerInfo[0].birthDt);
  const [gender, setGender] = useState<boolean | null>(registerInfo[0].gender);
  const [modifyStatus, setModifyStatus] = useState<boolean>(false); // *true : 수정상태, false: 조회상태
  const [passwordLengthChk, setpasswordLengthChk] = useState<boolean>(true);
  const [nickNameLengthChk, setNickNameLengthChk] = useState<boolean>(true);
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(true); //* 닉네임 중복체크 미개발
  const [passwordErrorChk, setPasswordErrorChk] = useState<boolean>(false); //비밀번호 에러 체크(조건 불일치,미입력)
  const [passwordReconfirm, setPasswordReconfirm] = useState<string>(""); //
  const [passwordReconfirmSuccessChk, setPasswordReconfirmSuccessChk] = // 비밀번호 재입력칸 에러 체크(비밀번호와 같은지 여부)
    useState<boolean | null>(null);

  const [year, setYear] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [day, setDay] = useState<string>();

  const handleGenderCheck = (e: any) => {
    setGender(
      e.target.value === "M" ? true : e.target.value === "F" ? false : null
    );
  };
  const handlePasswordBlur = (e: any) => {
    const Regexp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    if (!Regexp.test(password) && password.length > 1) {
      setPasswordErrorChk(true);
    } else {
      setPasswordErrorChk(false);
    }

    if (password === passwordReconfirm && passwordReconfirm.length > 0) {
      setPasswordReconfirmSuccessChk(false); //성공
    } else if (passwordReconfirm.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); // 실패
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
  const handleYaerUpdate = (e: any) => {
    setYear(e.value);
  };
  const handleMonthUpdate = (e: any) => {
    setMonth(e.value);
  };
  const handleDayUpdate = (e: any) => {
    setDay(e.value);
  };
  return (
    <>
      <div className="register-main">
        <Header title="개인 정보 관리" />

        <div className="register-box margintop-32">
          <div>닉네임</div>
          <input
            type="text"
            placeholder="8글자 이내로 만들어주세요."
            id="nickName"
            className="register-input margintop-8"
            // style={{ background: nickNameChk ? "" : "red" }}
            onChange={handlenickNameUpdate}
            // onBlur={handleNickNameBlur}
            value={nickName}
            maxLength={30}
          />
        </div>
        <div className="register-box margintop-36">
          <div>이메일</div>
          <input
            type="text"
            placeholder="이메일을 입력해주세요."
            id="nickName"
            className="register-input margintop-8"
            // style={{ background: nickNameChk ? "" : "red" }}
            onChange={handlenickNameUpdate}
            // onBlur={handleNickNameBlur}
            value={email}
            maxLength={30}
          />
        </div>
        <div className="register-flex-column-gap0 margintop-36">
          <div>비밀번호</div>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="8~20자의 영문, 숫자, 특수문자로 구성해주세요."
              id="password"
              className={
                passwordErrorChk === false
                  ? "register-input margintop-8"
                  : "register-input-error margintop-8"
              }
              // style={{ background: passwordErrorChk ? "" : "red" }}
              onChange={handlePasswordUpdate}
              onBlur={handlePasswordBlur}
              value={password}
              maxLength={30}
            />
            {passwordErrorChk === true ? (
              <>
                <label
                  htmlFor="passwordReconfirm"
                  className="register-input-close"
                  onClick={() => {
                    setPassword("");
                  }}
                ></label>
              </>
            ) : (
              <></>
            )}
          </div>
          {passwordErrorChk ? (
            <div className="register-input-error-msg">
              비밀번호는 8~20자의 영문, 숫자, 특수문자로 구성해주세요.
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="register-flex-column-gap10 margintop-32">
          <div>성별(선택)</div>
          <div>
            <input
              className="register-gender-box"
              value="M"
              id="male"
              type="radio"
              checked={gender === true}
              onChange={handleGenderCheck}
            />
            <label htmlFor="male" className="register-gender-label">
              남성
            </label>
            <input
              className="register-gender-box marginleft-35"
              value="F"
              id="feMale"
              type="radio"
              checked={gender === false}
              onChange={handleGenderCheck}
            />
            <label className="register-gender-label" htmlFor="feMale">
              여성
            </label>
            <input
              className="register-gender-box marginleft-35"
              value="N"
              id="not"
              type="radio"
              checked={gender === null}
              onChange={handleGenderCheck}
            />
            <label className="register-gender-label" htmlFor="feMale">
              선택안함
            </label>
          </div>
        </div>
        <div className="register-flex-column-gap8 margintop-35">
          <div>생년월일</div>
          <div className="register-flex-row-gap8">
            <SelectBox
              handleYaerUpdate={handleYaerUpdate}
              handleMonthUpdate={handleMonthUpdate}
              handleDayUpdate={handleDayUpdate}
            />
          </div>
        </div>
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
