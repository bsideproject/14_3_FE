import testRegisterStore from "store/modules/TestRegister";
import Auth from "store/modules/Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputActionMeta } from "react-select";
import SelectBox from "components/common/SelectBox";
import Footer from "components/Footer";
import useDefaultSets from "store/modules/Defaults";
import InputBox from "components/common/InputBox";

const Mypage: React.FC = () => {
  //헤더설정
  const { setHeaderText,setIsNavigation } = useDefaultSets();
  useEffect(() => {
    setHeaderText("개인 정보 수정");
    setIsNavigation(false)
    return () => setIsNavigation(true)
  }, []);
  const { registerInfo, updateId } = testRegisterStore((state) => state); // zustand로 가져온 임시데이터
  const { isInfoChange, updateInfoChangeStatus } = Auth((state) => state); // zustand로 가져온 임시데이터
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>(registerInfo[0].email);
  const [nickName, setNickName] = useState<string>(registerInfo[0].nickName);
  const [password, setPassword] = useState<string>(registerInfo[0].password);
  const [rePassword, setRePassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRePassword, setNewRePassword] = useState<string>("");
  const [birthDt, setBirthDt] = useState<string>(registerInfo[0].birthDt);
  const [gender, setGender] = useState<boolean | null>(registerInfo[0].gender);
  const [modifyStatus, setModifyStatus] = useState<boolean>(false); // *true : 수정상태, false: 조회상태
  const [passwordLengthChk, setpasswordLengthChk] = useState<boolean>(true);
  const [nickNameLengthChk, setNickNameLengthChk] = useState<boolean>(true);
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(true); //* 닉네임 중복체크 미개발
  const [passwordErrorChk, setPasswordErrorChk] = useState<boolean>(false); //비밀번호 에러 체크(조건 불일치,미입력)
  const [passwordReconfirm, setPasswordReconfirm] = useState<string>(""); // 비밀번호 확인
  const [passwordChangeChk, setPasswordChangeChk] = useState<boolean>(false); // 비밀번호 변경 버튼 클릭 여부
  const [passwordReconfirmSuccessChk, setPasswordReconfirmSuccessChk] = // 비밀번호 재입력칸 에러 체크(비밀번호와 같은지 여부)
    useState<boolean | null>(null);

  const [rePasswordChk, setRePasswordChk] = useState<boolean>(false);
  const [year, setYear] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [day, setDay] = useState<string>();
  const [emailAgree, setEmailAgree] = useState<boolean>(false);
  const handleGenderCheck = (e: any) => {
    setGender(
      e.target.value === "M" ? true : e.target.value === "F" ? false : null
    );
  };
  const handlePasswordBlur = (e: any) => {
    const Regexp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    // if (password == 1) {
    // } else
    if (!Regexp.test(newPassword) && newPassword.length > 1) {
      setPasswordErrorChk(true);
    } else {
      setPasswordErrorChk(false);
    }

    if (newPassword === passwordReconfirm && passwordReconfirm.length > 0) {
      setPasswordReconfirmSuccessChk(false); //성공
    } else if (passwordReconfirm.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); // 실패
    }
  };

  const handlePasswordUpdate = (e: any) => {
    setPassword(e.target.value);
  };
  const handleRePasswordUpdate = (e: any) => {
    setRePassword(e.target.value);
  };
  const handleNewPasswordUpdate = (e: any) => {
    setNewPassword(e.target.value);
  };
  const handlePasswordChagneUpdate = (e: any) => {
    setPasswordChangeChk(!passwordChangeChk);
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

  const handleEmailAgree = (e: any) => {
    setEmailAgree(!emailAgree);
  };
  const handleRePasswordDiff = (e: any) => {
    if (password === rePassword || rePassword.length === 0) {
      setRePasswordChk(true);
    } else {
      setRePasswordChk(false);
    }
  };

  const handleRePasswordReset = (e: any) => {
    setRePassword("");
  };
  return (
    <>
      <div className="register-main">
        <InputBox
          title={"닉네임"}
          buttonTitle="중복 확인"
          inputPlaceholader={"8글자 이내로 만들어주세요."}
          inputMaxLength={8}
          id={"nickName"}
          inputClassName={"register-flex-row-gap8 margintop-32"}
          inputValue={nickName}
          isButton={false}
          isDisable={true}
        />

        <InputBox
          title={"이메일"}
          inputPlaceholader={"이메일을 입력해주세요."}
          id={"nickName"}
          inputClassName={"register-flex-row-gap8 margintop-32"}
          inputValue={email}
          isButton={false}
          isDisable={true}
        />

        {!isInfoChange ? (
          <InputBox
            title={"비밀번호"}
            id={"password"}
            inputType={"password"}
            inputClassName={"register-flex-row-gap8 margintop-32"}
            buttonClick={handlePasswordChagneUpdate}
            inputValue={password}
            isButton={false}
            // inputBlur={}
            isDisable={true}
            buttonTitle={!passwordChangeChk ? "변경" : "취소"}
          />
        ) : (
          <>
            <InputBox
              title={"기존 비밀번호"}
              inputPlaceholader={"기존 비밀번호를 입력해주세요."}
              id={"passwordChange"}
              inputType={"password"}
              inputClassName={"register-flex-row-gap8 margintop-32"}
              buttonClick={handlePasswordChagneUpdate}
              inputChange={handleRePasswordUpdate}
              inputValue={!passwordChangeChk ? password : rePassword}
              isButton={true}
              inputBlur={handleRePasswordDiff}
              isDisable={!passwordChangeChk}
              buttonTitle={!passwordChangeChk ? "변경" : "취소"}
              isClose={!rePasswordChk}
              closeClick={handleRePasswordReset}
            />
            <InputBox
              title={"새 비밀번호"}
              inputPlaceholader={
                "8~20자의 영문, 숫자, 특수문자로 구성해주세요."
              }
              id={"newPassword"}
              inputType={"password"}
              inputClassName={"register-flex-row-gap8 margintop-32"}
              inputChange={handleNewPasswordUpdate}
              inputValue={newPassword}
              isButton={false}
              inputBlur={handlePasswordBlur}
              isDisable={isInfoChange && !passwordChangeChk}
              buttonTitle={!passwordChangeChk ? "변경" : "취소"}
              isClose={passwordErrorChk}
              closeClick={handleRePasswordReset}
            />
            <InputBox
              title={"새 비밀번호 확인"}
              inputPlaceholader={"새 비밀번호를 다시 입력해주세요."}
              id={"passwordChange"}
              inputType={"password"}
              inputClassName={"register-flex-row-gap8 margintop-32"}
              buttonClick={handlePasswordChagneUpdate}
              inputChange={handleRePasswordUpdate}
              inputValue={rePassword}
              isButton={isInfoChange}
              inputBlur={handleRePasswordDiff}
              isDisable={isInfoChange && !passwordChangeChk}
              buttonTitle={!passwordChangeChk ? "변경" : "취소"}
              isClose={rePasswordChk}
              closeClick={handleRePasswordReset}
            />
          </>
        )}

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
              disabled={!isInfoChange}
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
              disabled={!isInfoChange}
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
              disabled={!isInfoChange}
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
              disabled={!isInfoChange}
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
              disabled={!isInfoChange}
            />
          </div>
        </div>
        <div className="register-flex-row-gap0 margintop-32">
          <input
            type="checkbox"
            className="register-email-check-box"
            name="rememberme"
            id="emailAgree"
            checked={emailAgree}
            onChange={handleEmailAgree}
            disabled={true}
          />
          <label htmlFor="emailAgree" className="body3-regular marginleft-7">
            이메일 수신 동의(선택)
          </label>
        </div>
        <div className="caption1-regular margintop-8">
          *이메일 수신을 동의하시면, 매월 말 월간 회고를 위한 원페이저를
          보내드립니다.
        </div>
        {/* <button type="button">저장</button> */}
        {isInfoChange === false ? (
          <button
            className="register-button margintop-48"
            style={{ width: "100%" }}
            onClick={() => {
              navigate("/password-check");
            }}
          >
            개인 정보 수정
          </button>
        ) : (
          <button
            type="submit"
            className="register-button margintop-48"
            style={{ width: "100%" }}
          >
            수정하기
          </button>
        )}
      </div>
    </>
  );
};
export default Mypage;
