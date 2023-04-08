import Header from "components/auth/Header";
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "assets/pages/auth/register.css";
import fetch from "utils/fetch";
import Select from "react-select";
import { Scrollbars } from "react-custom-scrollbars-2";
const Register: React.FC = () => {
  const initCalendar = useMemo(() => {
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = ("0" + (1 + date.getMonth())).slice(-2);
    const nowDay = ("0" + date.getDate()).slice(-2);
    return [
      { value: String(nowYear), label: String(nowYear) },
      { value: nowMonth, label: nowMonth },
      { value: nowDay, label: nowDay },
    ];
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [birthDt, setBirthDt] = useState<string>("");
  const [gender, setGender] = useState<boolean>(true);
  const [emailFormChk, setEmailFormChk] = useState<boolean>(true); //* 이메일 형식체크만 개발완료
  const [emailExistChk, setEmailExistChk] = useState<boolean>(true); //* 이메일 중복체크 미개발
  const [passwordLengthChk, setpasswordLengthChk] = useState<boolean>(true);
  const [nickNameLengthChk, setNickNameLengthChk] = useState<boolean>(true);
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(true); //* 닉네임 중복체크 미개발
  const [authNumber, setAuthNumber] = useState<string>("");
  const [year, setYear] = useState<string>(initCalendar[0].value);
  const [month, setMonth] = useState<string>(initCalendar[1].value);
  const [day, setDay] = useState<string>(initCalendar[2].value);
  const [emailAgree, setEmailAgree] = useState<boolean>(false);
  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);
  const [check3, setCheck3] = useState<boolean>(false);
  const [check4, setCheck4] = useState<boolean>(false);

  const [calendar, setCalendar] = useState<{
    year: { value: string; label: string }[];
    month: { value: string; label: string }[];
    day: { value: string; label: string }[];
  }>({
    year: [],
    month: [],
    day: [],
  });

  useEffect(() => {
    setTodayDate(initCalendar);
  }, []);

  function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailFormChk(emailRegex.test(email));
  }

  const setTodayDate = (
    initCalendar: {
      value: string;
      label: string;
    }[]
  ) => {
    // cal.current = [String(year), month, day];
    const yearList = [];
    const monthList = [];
    const dayList = [];
    // 년도 구하기
    for (let i = Number(initCalendar[0].value); i >= 1931; i--) {
      yearList.push({ value: String(i), label: String(i) });
    }
    //월 구하기
    for (let i = 1; i <= 12; i++) {
      const input = i > 9 ? String(i) : "0" + i;
      monthList.push({ value: input, label: input });
    }
    //일 구하기
    for (let i = 1; i <= 31; i++) {
      var input = i > 9 ? String(i) : "0" + i;
      dayList.push({ value: input, label: input });
    }
    setCalendar({ year: yearList, month: monthList, day: dayList });
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
  const handlePasswordCheckUpdate = (e: any) => {
    setPasswordCheck(e.target.value);
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
    setGender(e.target.value === "M" ? true : false);
  };
  const handleRegister = async (e: any): Promise<void> => {
    try {
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
          <div className="register-flex-row-gap8 margintop-32">
            <div className="register-box">
              <div>닉네임</div>
              <input
                type="text"
                placeholder="8글자 이내로 만들어주세요."
                id="nickName"
                className="register-input margintop-8"
                // style={{ background: nickNameLengthChk ? "" : "red" }}
                onChange={handlenickNameUpdate}
                onBlur={handleNickNameBlur}
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
          <div className="register-flex-row-gap8 margintop-32">
            <div className="register-box">
              <div>이메일</div>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                id="email"
                className="register-input margintop-8"
                onChange={handleEmailUpdate}
                onBlur={handleEmailBlur}
                value={email}
                style={{ background: emailFormChk ? "" : "red" }}
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
          <div className="register-flex-row-gap8">
            <input
              type="text"
              placeholder="인증코드 6자리를 입력해주세요."
              id="authNumber"
              className="register-box register-input margintop-8"
              onChange={handleAuthNumberUpdate}
              onBlur={handleEmailBlur}
              value={authNumber}
              style={{ background: emailFormChk ? "" : "red" }}
              maxLength={6}
            />
            <button
              type="button"
              className="register-button margintop-8"
              // onClick={handleEmailExistCheck}
            >
              확인
            </button>
          </div>
          <div className="register-flex-row-gap0 margintop-8">
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
          <div className="register-flex-column-gap8 register-auth-content register-auth-title margintop-16">
            <div>인증코드가 오지 않는다면?</div>
            <div className="register-auth-subtitle">
              스팸메일함 혹은 프로모션함을 확인해보고 다시 한번 ‘인증하기’
              버튼을 눌러보세요.
            </div>
          </div>
          <div className="register-flex-column-gap8 margintop-32">
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="8~20자의 영문, 숫자, 특수문자로 구성해주세요."
              id="password"
              className="register-input"
              style={{ background: passwordLengthChk ? "" : "red" }}
              onChange={handlePasswordUpdate}
              onBlur={handlePasswordBlur}
              value={password}
              maxLength={30}
            />
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              id="password"
              className="register-input"
              style={{ background: passwordLengthChk ? "" : "red" }}
              onChange={handlePasswordCheckUpdate}
              onBlur={handlePasswordBlur}
              value={passwordCheck}
              maxLength={30}
            />
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
            </div>
          </div>
          <div className="register-flex-column-gap8 margintop-35">
            <div>생년월일</div>
            <div className="register-flex-row-gap8">
              <Select
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
              />
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
            <div className="register-flex-row-gap8 ">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="allcheck"
                id="allcheck"
                checked={emailAgree}
                onChange={handleEmailAgree}
              />
              <label
                htmlFor="allcheck"
                className="register-all-agree margintop-2"
              >
                전체 동의
              </label>
            </div>
            <hr style={{ width: "100%" }} color="#E9E7E2" />
            <div className="register-flex-row-gap8 ">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="allcheck"
                id="allcheck"
                checked={emailAgree}
                onChange={handleEmailAgree}
              />
              <label
                htmlFor="allcheck"
                className="register-all-agree margintop-2"
              >
                (필수) 만 14세 이상입니다.
              </label>
            </div>
            <div className="register-flex-row-gap8 ">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="allcheck"
                id="allcheck"
                checked={emailAgree}
                onChange={handleEmailAgree}
              />
              <label
                htmlFor="allcheck"
                className="register-all-agree margintop-2"
              >
                (필수) 개인정보 수집 및 이용 동의
              </label>
              <div style={{ width: "27px" }}>보기</div>
            </div>
            <div className="register-flex-row-gap8 ">
              <input
                type="checkbox"
                className="register-email-check-box"
                name="allcheck"
                id="allcheck"
                checked={emailAgree}
                onChange={handleEmailAgree}
              />
              <label
                htmlFor="allcheck"
                className="register-all-agree margintop-2"
              >
                (필수) 서비스 이용약관 동의
              </label>
              <div style={{ width: "27px" }}>보기</div>
            </div>
          </div>
          <button type="submit">완료</button>
        </form>
      </div>
    </>
  );
};
export default Register;
