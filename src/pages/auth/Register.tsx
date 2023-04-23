import Header from "components/auth/Header";
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "assets/pages/auth/register.css";
import fetch from "utils/fetch";

import SelectBox from "components/common/SelectBox";
import InputBox from "components/common/InputBox";
const Register: React.FC = () => {
  const ReconfirmRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordReconfirm, setPasswordReconfirm] = useState<string>("");
  const [birthDt, setBirthDt] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>(null);

  const [emailChk, setEmailChk] = useState<boolean>(false);
  const [emailFormChk, setEmailFormChk] = useState<boolean>(true); //* 이메일 형식체크만 개발완료
  const [emailExistChk, setEmailExistChk] = useState<boolean>(true); //* 이메일 중복체크 미개발

  const [passwordErrorChk, setPasswordErrorChk] = useState<boolean>(false); //비밀번호 에러 체크(조건 불일치,미입력)
  const [passwordReconfirmSuccessChk, setPasswordReconfirmSuccessChk] = // 비밀번호 재입력칸 에러 체크(비밀번호와 같은지 여부)
    useState<boolean | null>(null);

  const [nickNameChk, setNickNameChk] = useState<boolean>(true); // 닉네임 여부 체크
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(true); //* 닉네임 중복체크 미개발

  const [authNumber, setAuthNumber] = useState<string>(""); // 인증코드 미완료
  const [authNumberChk, setAuthNumberChk] = useState<boolean>(true); // * 이메일 인증코드 입력 체크

  const [year, setYear] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [day, setDay] = useState<string>();
  const [emailAgree, setEmailAgree] = useState<boolean>(false);

  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkAgeAgree, setCheckAgeAgree] = useState<boolean>(false);
  const [checkInfoAgree, setCheckInfoAgree] = useState<boolean>(false);
  const [checkServiceAgree, setCheckServiceAgree] = useState<boolean>(false);
  const [needCheck, setNeedCheck] = useState<boolean>(false);
  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailFormChk(emailRegex.test(email));

    console.log(emailRegex.test(email));

    if (emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  const handleEmailUpdate = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordBlur = (e: any) => {
    const Regexp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    if (!Regexp.test(password) && password.length > 0) {
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
  const handlePasswordReconfirmBlur = (e: any) => {
    if (password === passwordReconfirm && passwordReconfirm.length > 0) {
      setPasswordReconfirmSuccessChk(false); //성공
    } else if (password.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); // 실패
    }
  };
  const handleNickNameCheck = () => {
    if (nickName.length > 0 && nickName.length < 9) {
      setNickNameChk(true);
      return false;
    } else {
      setNickNameChk(false);
      return true;
    }
  };

  const handlePasswordUpdate = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordReconfirmUpdate = (e: any) => {
    setPasswordReconfirm(e.target.value);
  };

  const handlenickNameUpdate = (e: any) => {
    setNickName(e.target.value);
  };

  const handleBirthDateUpdate = (e: any) => {
    setBirthDt(e.target.value);
  };
  // const handleBirthDateBlur = (e: any) => {
  //   const inputDate = new Date(e.target.value);
  //   const minDate = new Date("1900-01-01");
  //   const maxDate = new Date(today);
  //   if (inputDate < minDate) {
  //     setBirthDt("1900-01-01");
  //     alert("입력할 수 없습니다.");
  //   } else if (inputDate > maxDate) {
  //     setBirthDt(today);
  //     alert("입력할 수 없습니다.");
  //   }
  // };

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
    setGender(
      e.target.value === "M" ? true : e.target.value === "F" ? false : null
    );
  };
  const handleRegister = async (e: any): Promise<void> => {
    try {
      e.preventDefault();

      if (handleNickNameCheck()) {
        // 닉네임 존재여부 체크
        document.getElementById("nickName")?.focus();
      } else if (email.length === 0) {
        setEmailChk(true);
      } else if (isValidEmail()) {
        // 이메일 유효성 검사
        document.getElementById("email")?.focus();
      }
      // else if (authNumber.length === 0) {
      //   setAuthNumberChk(false);
      //   document.getElementById("authNumber")?.focus();
      // }
      else if (passwordErrorChk) {
        document.getElementById("password")?.focus();
      } else if (passwordReconfirmSuccessChk) {
        document.getElementById("passwordReconfirm")?.focus();
      } else if (!emailExistChk) {
        // 미완료
        alert("중복된 이메일입니다.");
        document.getElementById("email")?.focus();
      } else if (!nickNameExistChk) {
        //미완료
        alert("중복된 닉네임입니다.");
        document.getElementById("email")?.focus();
      } else if (!allCheck) {
        setNeedCheck(true);
      } else {
        setNeedCheck(false);
        await fetch
          .post("/user/signUp", {
            eml: email,
            password,
            usrNm: nickName,
            brdt: birthDt,
            gndrClsCd: gender ? "M" : "F",
          })
          .then((e: any) => {
            if (e.status === 200) {
              alert("회원가입이 완료 되었습니다.");
              navigate("/login");
            }
          })
          .catch((e: any) => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleAuthNumberUpdate = (e: any) => {
    setAuthNumber(e.target.value);
  };
  const handleEmailAgree = (e: any) => {
    setEmailAgree(!emailAgree);
  };
  const handleAllCheck = (e: any) => {
    setAllCheck(!allCheck);
    setCheckAgeAgree(!allCheck);
    setCheckInfoAgree(!allCheck);
    setCheckServiceAgree(!allCheck);
  };
  const handleAgeAgree = (e: any) => {
    setCheckAgeAgree(!checkAgeAgree);
    if (
      !checkAgeAgree === false &&
      checkInfoAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(false);
    } else if (
      !checkAgeAgree === true &&
      checkInfoAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(true);
    }
  };
  const handleInfoAgree = (e: any) => {
    setCheckInfoAgree(!checkInfoAgree);
    if (
      !checkInfoAgree === false &&
      checkAgeAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(false);
    } else if (
      !checkInfoAgree === true &&
      checkAgeAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(true);
    }
  };
  const handleServiceAgree = (e: any) => {
    setCheckServiceAgree(!checkServiceAgree);
    if (
      !checkServiceAgree === false &&
      checkInfoAgree === true &&
      checkAgeAgree === true
    ) {
      setAllCheck(false);
    } else if (
      !checkServiceAgree === true &&
      checkInfoAgree === true &&
      checkAgeAgree === true
    ) {
      setAllCheck(true);
    }
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
        <Header title="회원 가입하기" />
        <form onSubmit={handleRegister}>
          <InputBox
            title={"닉네임"}
            buttonTitle="중복 확인"
            inputPlaceholader={"8글자 이내로 만들어주세요."}
            inputMaxLength={8}
            id={"nickName"}
            inputClassName={"register-flex-row-gap8 margintop-32"}
            inputChange={handlenickNameUpdate}
            inputValue={nickName}
            buttonClick={handleEmailExistCheck}
            inputCheck={nickNameChk}
            errMsg={"닉네임을 입력해주세요."}
            errObject={
              nickNameChk === false ? (
                <div className="register-input-error-msg">
                  닉네임을 입력해주세요.
                </div>
              ) : (
                <></>
              )
            }
          />
          {/* <div className="register-flex-row-gap8 margintop-32">
            <div className="register-box">
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
            <button
              type="button"
              className="register-button margintop-28"
              onClick={handleEmailExistCheck}
            >
              중복 확인
            </button>
          </div>
          {nickNameChk === false ? (
            <div className="register-input-error-msg">
              닉네임을 입력해주세요.
            </div>
          ) : (
            <></>
          )} */}
          <InputBox
            title="이메일"
            buttonTitle="인증하기"
            inputPlaceholader={"이메일을 입력해주세요."}
            inputMaxLength={30}
            id={"email"}
            inputClassName={"register-flex-row-gap8 margintop-32"}
            inputChange={handleEmailUpdate}
            inputValue={email}
            buttonClick={handleEmailExistCheck}
            inputCheck={emailChk}
            errObject={
              emailChk === true ? (
                <div className="register-input-error-msg">
                  이메일을 입력해주세요.
                </div>
              ) : emailFormChk === false ? ( //이메일 형식이 바르지 않다면
                <div className="register-input-error-msg">
                  이메일을 형식을 확인해주세요.
                </div>
              ) : (
                <></>
              )
            }
            errMsg={"닉네임을 입력해주세요."}
          />
          {/* <div className="register-flex-row-gap8 margintop-32">
            <div className="register-box">
              <div>이메일</div>
              <input
                // type="email"
                placeholder="이메일을 입력해주세요."
                id="email"
                className="register-input margintop-8"
                onChange={handleEmailUpdate}
                // onBlur={handleEmailBlur}
                value={email}
                // style={{ background: emailFormChk ? "" : "red" }}
                maxLength={30}
              />
            </div>
            <button
              type="button"
              className="register-button margintop-28"
              onClick={handleEmailExistCheck}
            >
              인증하기
            </button>
          </div>
          {emailChk === true ? (
            <div className="register-input-error-msg">
              이메일을 입력해주세요.
            </div>
          ) : emailFormChk === false ? ( //이메일 형식이 바르지 않다면
            <div className="register-input-error-msg">
              이메일을 형식을 확인해주세요.
            </div>
          ) : (
            <></>
          )} */}
          <InputBox
            buttonTitle="확인"
            inputPlaceholader={"인증코드 6자리를 입력해주세요."}
            inputMaxLength={6}
            id={"authNumber"}
            inputClassName={"register-flex-row-gap8"}
            inputChange={handlenickNameUpdate}
            inputValue={authNumber}
            buttonClick={handleEmailExistCheck}
            inputCheck={authNumberChk}
            errMsg={"닉네임을 입력해주세요."}
            errObject={
              authNumberChk === false ? (
                <div className="register-input-error-msg">
                  이메일 인증 코드를 입력해주세요.
                </div>
              ) : (
                <></>
              )
            }
          />
          {/* <div className="register-flex-row-gap8">
            <input
              type="text"
              placeholder="인증코드 6자리를 입력해주세요."
              id="authNumber"
              className="register-box register-input body3-regular margintop-8"
              onChange={handleAuthNumberUpdate}
              // onBlur={handleEmailBlur}
              value={authNumber}
              // style={{ background: emailFormChk ? "" : "red" }}

              maxLength={6}
            />
            <button
              type="button"
              className="register-button body3-bold margintop-8"
              // onClick={handleEmailExistCheck}
            >
              확인
            </button>
          </div> */}
          <div className="register-flex-row-gap4 margintop-11">
            <input
              type="checkbox"
              className="register-email-check-box"
              name="rememberme"
              id="rememberId"
              checked={emailAgree}
              onChange={handleEmailAgree}
            />
            <label className="register-email-agree margintop-6">
              이메일 수신 동의(선택)
            </label>
          </div>
          <div className="register-email-explain">
            *이메일을 통해 매월 말 월간 회고 리추얼 북을 보내드립니다.
            <br />
            마이페이지에서 이메일 알람 수신 동의 여부를 변경할 수 있습니다.
          </div>
          <div className="register-flex-column-gap4 register-auth-content  margintop-16">
            <div className="body3-Bold">인증코드가 오지 않는다면?</div>
            <div className="caption1-regular">
              스팸메일함 혹은 프로모션함을 확인해보고 다시 한번 ‘인증하기’
              버튼을 눌러보세요.
            </div>
          </div>
          <div className="register-flex-column-gap0 margintop-32">
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
                      setTimeout(
                        () => document.getElementById("password")?.focus(),
                        1
                      );
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
            <div style={{ position: "relative" }}>
              <input
                ref={ReconfirmRef}
                id="passwordReconfirm"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                className={
                  passwordReconfirmSuccessChk === null
                    ? "register-input margintop-8"
                    : passwordReconfirmSuccessChk === false
                    ? "register-input-success margintop-8"
                    : "register-input-error margintop-8"
                }
                onChange={handlePasswordReconfirmUpdate}
                onBlur={handlePasswordReconfirmBlur}
                value={passwordReconfirm}
                maxLength={30}
              />
              {passwordReconfirmSuccessChk === true ? (
                <>
                  <label
                    htmlFor="passwordReconfirm"
                    className="register-input-close"
                    onClick={() => {
                      setPasswordReconfirm("");
                    }}
                  ></label>
                </>
              ) : (
                <></>
              )}
            </div>
            {passwordReconfirmSuccessChk === true ? (
              <>
                <div className="register-input-error-msg">
                  비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                </div>
              </>
            ) : passwordReconfirmSuccessChk === false ? (
              <div className="register-input-success-msg">
                비밀번호가 일치합니다.
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
              <label
                htmlFor="male"
                className="register-gender-label body3-regular"
              >
                여성
              </label>
              <input
                className="register-gender-box marginleft-35"
                value="F"
                id="feMale"
                type="radio"
                checked={gender === false}
                onChange={handleGenderCheck}
              />
              <label
                className="register-gender-label body3-regular"
                htmlFor="feMale"
              >
                남성
              </label>
            </div>
          </div>
          <div className="register-flex-column-gap8 margintop-32">
            <div>생년월일</div>
            <div className="register-flex-row-gap8">
              <SelectBox
                handleYaerUpdate={handleYaerUpdate}
                handleMonthUpdate={handleMonthUpdate}
                handleDayUpdate={handleDayUpdate}
              />
              {/* <Select
                className="register-selectBox"
                options={calendar.year}
                placeholder="년도"
                onChange={handleYaerUpdate}
                // styles={styles}
              />
              <Select
                className="register-selectBox"
                options={calendar.month}
                onChange={handleMonthUpdate}
                placeholder="월"
              />
              <Select
                className="register-selectBox"
                options={calendar.day}
                onChange={handleDayUpdate}
                placeholder="일"
              /> */}
              {/* <input
                type="year"
                placeholder="생년월일 입력"
                id="birthDt"
                onChange={handleBirthDateUpdate}
                onBlur={handleBirthDateBlur}
                value={birthDt}
                max={today}
                min={"1900-01-01"}
              /> */}
            </div>
          </div>
          <div className="register-flex-column-gap8 margintop-32">
            <div>이용 약관 동의 </div>
            <div className="register-flex-row-gap8">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="allcheck"
                id="allcheck"
                checked={allCheck}
                onChange={handleAllCheck}
              />
              <label
                htmlFor="allcheck"
                className="register-all-agree middleFont margintop-2"
              >
                전체 동의
              </label>
            </div>
            <hr
              className="margintop-8"
              style={{ width: "100%" }}
              color="#E9E7E2"
            />
            <div className="register-flex-row-gap4 margintop-8">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="ageCheck"
                id="ageCheck"
                checked={checkAgeAgree}
                onChange={handleAgeAgree}
              />
              <label
                htmlFor="ageCheck"
                className="register-all-agree body3-regular"
              >
                (필수) 만 14세 이상입니다.
              </label>
            </div>
            <div className="register-flex-row-gap4 margintop-8">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="infoCheck"
                id="infoCheck"
                checked={checkInfoAgree}
                onChange={handleInfoAgree}
              />
              <label
                htmlFor="infoCheck"
                className="register-all-agree body3-regular"
              >
                (필수) 개인정보 수집 및 이용 동의
              </label>
              <div style={{ width: "27px" }}>보기</div>
            </div>
            <div className="register-flex-row-gap4 margintop-8">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="serviceCheck"
                id="serviceCheck"
                checked={checkServiceAgree}
                onChange={handleServiceAgree}
              />
              <label
                htmlFor="serviceCheck"
                className="register-all-agree body3-regular"
              >
                (필수) 서비스 이용약관 동의
              </label>
              <div style={{ width: "27px" }}>보기</div>
            </div>
          </div>

          <div className="margintop-48">
            {needCheck === true ? (
              <div className="register-input-error-msg">
                *필수 항목에 동의하셔야 가입할 수 있습니다.
              </div>
            ) : (
              <></>
            )}
            <button
              type="submit"
              className="register-button"
              style={{ width: "100%" }}
            >
              회원 가입하기
            </button>
          </div>
        </form>
      </div>

      {/* <AlertTextPopup
        text={"이메일 인증이 완료되었습니다!"}
        text2={""}
        callbackFunction={() => {}}
      /> */}
    </>
  );
};
export default Register;
