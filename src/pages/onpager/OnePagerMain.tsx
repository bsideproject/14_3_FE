import { useEffect, useState } from "react";
import useDefaultSets from "store/modules/Defaults";
import useAnsweredList from "store/modules/Answers";
import DateFormatUI from "components/main/DateFormatUI";
import DownloadIcon from "components/onepager/DownloadIcon";
import AnsweredCategoryUI from "components/main/AnsweredCategoryUI";
import Header from "components/auth/Header";
import Footer from "components/Footer";
import ConfirmInputPopup from "components/onepager/ConfirmInputPopup";
import ToastPopup from "components/ToastPopup";
import SVG from "components/onepager/svg";
import EmailIcon from "components/onepager/EmailIcon";
import html2canvas from "html2canvas";
import Masonry from "react-masonry-css";
import downloadjs from "downloadjs";
import { AxiosResponse } from "axios";
import fetch from "utils/fetch";
import GomingLogo from "assets/images/main/onepager-goming-logo.png";
import "assets/pages/onepager/onepagermain.css";
import OnepagerExampleView from "components/onepager/OnepagerExampleView";
import useAuthStore from "store/modules/Auth";

/**
 * @desc 원페이저 다운로드 로직
 * @desc html -> canvas -> image -> download
 */
const OnePagerMain = () => {
  const { setHeaderText, setIsNavigation } = useDefaultSets();
  const { selectedMonth, answeredList } = useAnsweredList();
  const [confirmEmailPopup, setConfirmEmailPopup] = useState<boolean>(false); //confirm팝업제어
  const [toastPopup, setToastPopup] = useState<boolean>(false); //toast팝업제어
  const [lastDate, setLastDate] = useState<String>();
  const [firstDate, setFirstDate] = useState<String>();
  const { userInfo } = useAuthStore((state) => state);
  useEffect(() => {
    if (answeredList.length > 0) {
      const [year, month, day] = answeredList[0].date.split("-");

      setLastDate(
        year + "-" + month + "-" + new Date(year, month, 0).getDate()
      );
      setFirstDate(
        year +
          "-" +
          month +
          "-" +
          ("00" + new Date(year, month, 1).getDate()).slice(-2)
      );
    }
    setHeaderText("월간고밍 다운로드");
    setIsNavigation(false);
    return () => setHeaderText("");
  }, []);

  //원페이저 이미지변환, img url return
  const toOnepagerImage = async () => {
    const wrapper = document.querySelector(".onepager-download") as HTMLElement;
    // alert(wrapper.textContent);
    // wrapper.style.display = ""; //hidden 시 canvas가 안그려지는 현상있음
    const canvas = await html2canvas(wrapper, {
      allowTaint: true,
      useCORS: true,
      scale: 1.5,
    }); //scale 2 옵션으로 출력   => 1920px
    // alert(canvas.getContext);
    const dataURL = canvas.toDataURL("image/png"); //이미지변환
    // wrapper.style.display = "none"; //canvas hidden 처리
    alert(dataURL.length);
    return dataURL;
  };

  //원페이저 다운로드 클릭 이벤트
  const downloadOnepager = async () => {
    // data URL에서 base64 인코딩된 데이터를 추출합니다.
    const base64Data = await toOnepagerImage();

    // base64 데이터를 ArrayBuffer로 변환합니다.
    const data = window.atob(base64Data.split(",")[1]);

    const arrayBuffer = new ArrayBuffer(data.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < data.length; i++) {
      view[i] = data.charCodeAt(i);
    }

    // ArrayBuffer를 Blob으로 변환합니다.
    const blob = new Blob([arrayBuffer], { type: "image/png" });

    alert(arrayBuffer.byteLength);
    downloadjs(blob, "goming", "image/png");
  };

  //이메일 보내기 클릭 이벤트
  const sendEmail = async (email: string) => {
    setConfirmEmailPopup(false); //팝업닫기
    // const imageURL = await toOnepagerImage();

    const param: any = {
      email: userInfo.eml,
      sendEmail: email,
      date: firstDate?.slice(0, 7),
      // image: imageURL,
    };

    //db connection
    console.log(param);
    const result: AxiosResponse<any> = await fetch.post(
      "/api/email/sendByMonth",
      param
    );
    console.log("result", result);
    if (result.status === 200) {
      setToastPopup(true); //토스트 팝업 출력
      setTimeout(() => {
        setToastPopup(false); //토스트 팝업 종료
      }, 3000);
    } else {
      return false;
    }
  };

  return (
    <>
      <div>
        <Header></Header>
        {/********************************************************************************************
         * 미리보기 영역
         * ***************************************************************************************/}
        <div style={{ margin: "0 16px" }}>
          <div style={{ marginTop: "32px" }}>
            <p className="body1-bold">미리보기</p>
          </div>
          <div className="onepager-wrap">
            <p className="body3-bold">{selectedMonth}월의 고밍</p>
            <OnepagerExampleView />
          </div>
          {/* 버튼영역 */}
          <div className="onepager-btn-wrap">
            <button className="btn-p-l" onClick={downloadOnepager}>
              <DownloadIcon></DownloadIcon>
              &nbsp;
              <span className="body3-bold" style={{ display: "inline-block" }}>
                다운로드
              </span>
            </button>
            <button
              className="btn-p-l"
              onClick={() => setConfirmEmailPopup(true)}
            >
              <EmailIcon></EmailIcon>
              <span className="body3-bold">이메일로 보내기</span>
            </button>
          </div>
        </div>

        {/********************************************************************************************
         * 다운로드 영역
         * ***************************************************************************************/}
        {/* Canvas */}
        {/* <div className='onepager-download' style={{display:'none'}}> */}
        <div className="onepager-download">
          <div className="onepager-download-header">
            <h1>{selectedMonth}월의 고밍</h1>
            <p className="body1-regular">
              {firstDate}~{lastDate}
            </p>
            <p className="headline2">
              {selectedMonth}월의 NICKNAME님은 어떤 하루하루를 보냈는지
              돌아볼까요?
            </p>
          </div>
          <Masonry
            width={1920}
            breakpointCols={4} //컬럼수
            className="my-masonry-grid-download"
            columnClassName="my-masonry-grid_column-download"
          >
            {answeredList.length > 0 ? (
              answeredList.map((item) => (
                <div key={item.index}>
                  <div className="answered-list-item-header-wrap caption1-regular">
                    <DateFormatUI date={item.date} />
                    <AnsweredCategoryUI category={item.category} />
                  </div>
                  <div className="onepager-list-item-q color-wgray13 body2-bold">
                    {item.question}
                  </div>
                  <div className="onepager-list-item-a body3-regular">
                    {item.answer}
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </Masonry>

          {/* 일러스트레이터 영역 */}
          <div style={{ height: "1080px" }}>
            <SVG />
          </div>

          {/* 일러스트 하단 로고 */}
          <div className="onepager-download-footer">
            <div style={{ maxWidth: "80px", maxHeight: "80px" }}>
              <img src={GomingLogo} alt="고밍로고" width={80} height={80} />
            </div>
            <p className="headline3">
              매일 하나씩 써 내려간 작은 조각들이 모여,
              <br />
              오늘의 나를 만듭니다.
              <br />
              나를 돌아보는 회고 리추얼, 고밍.
            </p>
          </div>

          {/* copyright */}
          <div className="onepager-download-copyright body2-regular">
            © 2023. Goming. All rights reserved.
          </div>
        </div>
      </div>
      <Footer></Footer>

      {/********************************************************************************************
       * 팝업 관련 영역
       * ***************************************************************************************/}
      {
        //confirm popup
        confirmEmailPopup && (
          <ConfirmInputPopup
            text="원페이저를 받을 이메일 주소가 맞나요?/n다른이메일로 받고 싶다면/n주소를 변경해주세요."
            confirmText="이메일 보내기"
            cancelText="취소하기"
            confirmCallbackFunction={(email: any) => {
              sendEmail(email);
            }}
            cancelCallbackFunction={() => setConfirmEmailPopup(false)}
          />
        )
      }

      {
        //toast popup
        toastPopup && (
          <ToastPopup
            text={"이메일로 원페이저가 전송되었습니다!"}
            bgColor={"#4D99DE"}
            textColor={"#FFFFFF"}
          />
        )
      }
    </>
  );
};
export default OnePagerMain;
