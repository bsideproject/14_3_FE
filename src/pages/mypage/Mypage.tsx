import testRegisterStore from "store/modules/TestRegister";
import Auth from "store/modules/Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputActionMeta } from "react-select";
import SelectBox from "components/common/SelectBox";
import Footer from "components/Footer";
import useDefaultSets from "store/modules/Defaults";
import InputBox from "components/common/InputBox";
import Header from "components/auth/Header";
import AlertTextPopup from "components/AlertTextPopup";

const Mypage: React.FC = () => {
  //헤더설정
  const { setHeaderText, setIsNavigation } = useDefaultSets();
  useEffect(() => {
    setHeaderText("개인 정보 수정");
    setIsNavigation(false);
    return () => setIsNavigation(true);
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
  const [gender, setGender] = useState<boolean | null>(registerInfo[0].gender);
  const [passwordErrorChk, setPasswordErrorChk] = useState<boolean>(false); //비밀번호 에러 체크(조건 불일치,미입력)
  const [passwordChangeChk, setPasswordChangeChk] = useState<boolean>(false); // 비밀번호 변경 버튼 클릭 여부
  const [passwordReconfirmSuccessChk, setPasswordReconfirmSuccessChk] = // 비밀번호 재입력칸 에러 체크(비밀번호와 같은지 여부)
    useState<boolean | null>(null);

  const [rePasswordChk, setRePasswordChk] = useState<boolean>(false);

  const [rePasswordExistChk, setRePasswordExistChk] = useState<boolean>(false);

  const [newPasswordExistChk, setNewPasswordExistChk] =
    useState<boolean>(false);

  const [newRePasswordExistChk, setNewRePasswordExistChk] =
    useState<boolean>(false);
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
    const Regexp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    // if (password == 1) {
    // } else
    if (!Regexp.test(newPassword) && newPassword.length >= 1) {
      setPasswordErrorChk(true);
    } else {
      setPasswordErrorChk(false);
    }
    setNewPasswordExistChk(false);
  };

  const handleRePasswordUpdate = (e: any) => {
    setRePassword(e.target.value);
  };
  const handleNewPasswordUpdate = (e: any) => {
    setNewPassword(e.target.value);
  };
  const handleNewRePasswordUpdate = (e: any) => {
    setNewRePassword(e.target.value);
  };
  const handlePasswordChagneUpdate = (e: any) => {
    setPasswordChangeChk(!passwordChangeChk);
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
      setRePasswordChk(false); // false 면 조건 충족
    } else {
      setRePasswordChk(true); //true면 조건 실패
    }

    setRePasswordExistChk(false);
  };
  const handleNewPasswordDiff = (e: any) => {
    if (newPassword === newRePassword && newRePassword.length > 1) {
      setPasswordReconfirmSuccessChk(false); // false 면 조건 충족
    } else if (newRePassword.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); //true면 조건 실패
    }

    setNewRePasswordExistChk(false);
  };

  const handleRePasswordReset = (e: any) => {
    document.getElementById("passwordChange")?.focus();
    setRePassword("");
  };
  const handleNewPasswordReset = (e: any) => {
    document.getElementById("newPassword")?.focus();
    setNewPassword("");
  };
  const handleNewRePasswordReset = (e: any) => {
    document.getElementById("newPasswordConfirm")?.focus();
    setNewRePassword("");
  };
  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      if (rePasswordChk || passwordErrorChk || passwordReconfirmSuccessChk) {
      } else if (rePassword.length === 0) {
        console.log("test");
        setRePasswordExistChk(true);
      } else if (newPassword.length === 0) {
        setNewPasswordExistChk(true);
      } else if (newRePassword.length === 0) {
        setNewRePasswordExistChk(true);
      } else {
        // await fetch
        //   .post("/user/signUp", {
        //     eml: email,
        //     password,
        //     usrNm: nickName,
        //     brdt: birthDt,
        //     gndrClsCd: gender ? "M" : "F",
        //   })
        //   .then((e: any) => {
        //     if (e.status === 200) {
        //       alert("회원가입이 완료 되었습니다.");
        //       navigate("/login");
        //     }
        //   })
        //   .catch((e: any) => {
        //     console.log(e);
        //   });
      }
    } catch (e) {}
  };
  return (
    <>
      <div>
        <Header />
        <div className="register-main">
          <form onSubmit={handleSubmit}>
            <InputBox
              title={"닉네임"}
              buttonTitle="중복 확인"
              inputPlaceholader={"8글자 이내로 만들어주세요."}
              inputMaxLength={8}
              id={"nickName"}
              inputClassName={"register-flex-row-gap8"}
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
                  inputValue={
                    passwordChangeChk === false ? password : rePassword
                  }
                  isButton={true}
                  inputBlur={handleRePasswordDiff}
                  isDisable={!passwordChangeChk}
                  buttonTitle={passwordChangeChk === false ? "변경" : "취소"}
                  isClose={
                    (passwordChangeChk && rePasswordChk) || rePasswordExistChk
                  }
                  closeClick={handleRePasswordReset}
                  errObject={
                    rePasswordChk === true ? (
                      <div className="register-input-error-msg">
                        기존 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                      </div>
                    ) : rePasswordExistChk === true ? (
                      <div className="register-input-error-msg">
                        비밀번호를 입력해주세요.
                      </div>
                    ) : (
                      <></>
                    )
                  }
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
                  buttonTitle={passwordChangeChk === false ? "변경" : "취소"}
                  isClose={passwordErrorChk || newPasswordExistChk}
                  closeClick={handleNewPasswordReset}
                  errObject={
                    passwordErrorChk === true ? (
                      <div className="register-input-error-msg">
                        비밀번호는 8~20자의 영문, 숫자, 특수문자로 구성해주세요.
                      </div>
                    ) : newPasswordExistChk === true ? (
                      <div className="register-input-error-msg">
                        비밀번호를 입력해주세요.
                      </div>
                    ) : (
                      <></>
                    )
                  }
                />
                <InputBox
                  title={"새 비밀번호 확인"}
                  inputPlaceholader={"새 비밀번호를 다시 입력해주세요."}
                  id={"newPasswordConfirm"}
                  inputType={"password"}
                  inputClassName={"register-flex-row-gap8 margintop-32"}
                  buttonClick={handlePasswordChagneUpdate}
                  inputChange={handleNewRePasswordUpdate}
                  inputValue={newRePassword}
                  isButton={false}
                  inputBlur={handleNewPasswordDiff}
                  isDisable={isInfoChange && !passwordChangeChk}
                  buttonTitle={!passwordChangeChk ? "변경" : "취소"}
                  closeClick={handleNewRePasswordReset}
                  isClose={
                    passwordReconfirmSuccessChk === null
                      ? false
                      : passwordReconfirmSuccessChk === false
                      ? null
                      : true || newRePasswordExistChk
                  }
                  errObject={
                    passwordReconfirmSuccessChk === true ? (
                      <div className="register-input-error-msg">
                        비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                      </div>
                    ) : passwordReconfirmSuccessChk === false ? (
                      <>
                        <div className="register-input-success-msg">
                          비밀번호가 일치합니다.
                        </div>
                      </>
                    ) : newRePasswordExistChk === true ? (
                      <div className="register-input-error-msg">
                        비밀번호를 입력해주세요.
                      </div>
                    ) : (
                      <></>
                    )
                  }
                />
              </>
            )}

            <div className="register-flex-column-gap10 margintop-32">
              <div>성별</div>
              <div>
                <input
                  className="radio-btn"
                  value="M"
                  id="male"
                  type="radio"
                  checked={gender === true}
                  onChange={handleGenderCheck}
                  disabled={!isInfoChange}
                />
                <label htmlFor="male" className="register-gender-label">
                  여성
                </label>
                <input
                  className="radio-btn marginleft-35"
                  value="F"
                  id="feMale"
                  type="radio"
                  checked={gender === false}
                  onChange={handleGenderCheck}
                  disabled={!isInfoChange}
                />
                <label className="register-gender-label" htmlFor="feMale">
                  남성
                </label>
                <input
                  className="radio-btn marginleft-35"
                  value="N"
                  id="not"
                  type="radio"
                  checked={gender === null}
                  onChange={handleGenderCheck}
                  disabled={!isInfoChange}
                />
                <label className="register-gender-label" htmlFor="feMale">
                  선택 안 함
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
                  disabled={true}
                />
              </div>
            </div>
            <div className="register-flex-row-gap0 margintop-32">
              <input
                type="checkbox"
                className="check-btn"
                name="rememberme"
                id="emailAgree"
                checked={emailAgree}
                onChange={handleEmailAgree}
                // disabled={true}
              />
              <label
                htmlFor="emailAgree"
                className="body3-regular marginleft-7"
              >
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
              <>
                <button
                  type="submit"
                  className="register-button margintop-48"
                  style={{ width: "100%" }}
                >
                  수정하기
                </button>

                {/* {1 === 1 ? (
                  <AlertTextPopup
                    // strongText="개인정보가 모두 수정되었습니다." //강조문구
                    text="개인정보가 모두 수정되었습니다." //일반문구1
                    confirmText="확인" //confirm 문구
                    callbackFunction={() => {}} //메인페이지로 이동
                  />
                ) : (
                  <></>
                )} */}
              </>
            )}
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Mypage;
