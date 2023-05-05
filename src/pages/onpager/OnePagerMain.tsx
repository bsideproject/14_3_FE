
import html2canvas from 'html2canvas';
import Masonry from 'react-masonry-css'
import 'assets/pages/onepager/onepagermain.css'
import Header from 'components/auth/Header';
import downloadjs from 'downloadjs'
import useDefaultSets from 'store/modules/Defaults';
import { useEffect, useState } from 'react';
import Footer from 'components/Footer';
import NavigationBar from 'components/NavigationBar';
import SVG from 'components/onepager/svg'
import SVG2 from 'components/onepager/svg2'
import DownloadIcon from 'components/onepager/DownloadIcon'
import EmailIcon from 'components/onepager/EmailIcon'
import ConfirmInputPopup from 'components/onepager/ConfirmInputPopup';
import { AxiosResponse } from 'axios';
import ToastPopup from "components/ToastPopup";
import useAnsweredList from 'store/modules/Answers';
import fetch from 'utils/fetch';

const testData = [
  {index: 1, content: 'contentsssssssssssssssssssss'},
  {index: 2, content: 'contensssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstssssssss'},
  {index: 3, content: 'contentssssssss'},
  {index: 4, content: 'contsssssssssssssssssentssssssss'},
  {index: 5, content: 'contentssssssss'},
  {index: 6, content: 'contentssssssss'},
  {index: 7, content: 'contentssssssss'},
  {index: 8, content: 'contentssssssss'},
  {index: 9, content: 'contentssssssss'},
  {index: 10, content: 'contentsssssssssssssssssssssddddddddddddddsssssss'},
  {index: 11, content: 'contentssssssss'},
  {index: 12, content: 'contessssssssssssssssssssssssssntssssssss'},
  {index: 13, content: 'contentssssgfggggggggggggggggggggggggggggggggggggggggggggggssss'},
  {index: 14, content: 'contessssssssssssssssssssssssssntssssssss'},
  {index: 15, content: 'contentssssssss'},
  {index: 16, content: 'contessssssssssssssssssssssssssntssssssss'},
  {index: 17, content: 'contentsssssssssssssssssssss'},
  {index: 18, content: 'contensssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstssssssss'},
  {index: 19, content: 'contentssssssss'},
  {index: 20, content: 'contsssssssssssssssssentssssssss'},
  {index: 21, content: 'contentssssssss'},
  {index: 22, content: 'contentssssssss'},
  {index: 23, content: 'contentssssssss'},
]

/**
 * @desc 원페이저 다운로드 로직
 * @desc html -> canvas -> image -> download
 */
const OnePagerMain = () => {
  const {setHeaderText, setIsNavigation} = useDefaultSets()
  const {selectedMonth} = useAnsweredList()
  const [confirmEmailPopup, setConfirmEmailPopup] = useState<boolean>(false)  //confirm팝업제어
  const [toastPopup, setToastPopup] = useState<boolean>(false)  //toast팝업제어

  useEffect(()=>{
    setHeaderText('월간고밍 다운로드')
    setIsNavigation(false)
    return () => setHeaderText('')
  },[])
  
  //원페이저 이미지변환, img url return
  const toOnepagerImage = async () => {
    const wrapper = document.querySelector('.onepager-download') as HTMLElement;
    wrapper.style.display = ''                              //hidden 시 canvas가 안그려지는 현상있음
    const canvas = await html2canvas(wrapper, {scale:2})    //scale 2 옵션으로 출력   => 1920px
    const dataURL = canvas.toDataURL('image/png')           //이미지변환      
    wrapper.style.display = 'none'                          //canvas hidden 처리
    return dataURL
  }

  //원페이저 다운로드 클릭 이벤트
  const downloadOnepager = async () => {
    const dataURL = await toOnepagerImage()                 //url 주소 가져오기
    downloadjs(dataURL, 'goming', 'image/png')              //다운로드
  }

  //이메일 보내기 클릭 이벤트
  const sendEmail = async (email:string) => {
    setConfirmEmailPopup(false) //팝업닫기
    const imageURL = await toOnepagerImage()
    const param:any = {
      eml: email,
      image: imageURL
    }

    //db connection
    // const result:AxiosResponse<any> = await fetch('/api/onepager/sendEmail', param)
    const result = true
    if (result === true) {
      setToastPopup(true)                 //토스트 팝업 출력
      setTimeout(()=>{
        setToastPopup(false)                 //토스트 팝업 종료
      },3000)
    } else {
      return false
    }
  }

  return (
    <>
    <div>
      <Header></Header>
      <div style={{margin: '0 16px'}}>
        <div style={{marginTop: '32px'}}>
          <p className='body1-bold'>미리보기</p>
        </div>
        <div className='onepager-wrap'>
          <Masonry
            breakpointCols={4}                          //컬럼수
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {
              testData.map(item => (
                <div key={item.index}>
                  <p className='word-wrap-break-word'>{item.index}</p>
                  <p className='word-wrap-break-word'>{item.content}</p>
                </div>
              ))
            }
          </Masonry>

        </div>
        {/* 버튼영역 */}
        <div className='onepager-btn-wrap'>
          <button className='btn-p-xl' onClick={downloadOnepager}>
            <DownloadIcon></DownloadIcon>
            &nbsp;다운로드
          </button>
          <button className='btn-p-xl' onClick={() => setConfirmEmailPopup(true)}>
            <EmailIcon></EmailIcon>
            &nbsp;이메일로 보내기
          </button>
        </div>
      </div>


      {/* Canvas */}
      <div className='onepager-download' style={{display:'none'}}>
      {/* <div className='onepager-download'> */}
        <div className='onepager-download-header'>
          <h1>{selectedMonth}월의 고밍</h1>
          <p className='body1-regular'>DATE~DATE</p>
          <p className='headline2'>{selectedMonth}월의 NICKNAME님은 어떤 하루하루를 보냈는지 돌아볼까요?</p>
        </div>
        <Masonry
          width={1920}
          breakpointCols={4}                          //컬럼수
          className="my-masonry-grid-download"
          columnClassName="my-masonry-grid_column-download">
          {
            testData.map(item => (
              <div key={item.index}>
                <p className='word-wrap-break-word'>{item.index}</p>
                <p className='word-wrap-break-word'>{item.content}</p>
              </div>
            ))
          }
        </Masonry>

        {/* 일러스트레이터 영역 */}
        <div>
          <SVG />
        </div>

        {/* 일러스트 하단 로고 */}
        <div className='onepager-download-footer'>
          <div>
            <SVG2 />
          </div>
          <p className='headline3'>
            매일 하나씩 써 내려간 작은 조각들이 모여,<br/>
            오늘의 나를 만듭니다.<br/>
            나를 돌아보는 회고 리추얼, 고밍. 
          </p>
        </div>

        {/* copyright */}
        <div className='onepager-download-copyright body2-regular'>
          @Goming All right reserved.
        </div>
        
      </div>

      { //confirm popup
        confirmEmailPopup && (
          <ConfirmInputPopup
            text="원페이저를 받을 이메일 주소가 맞나요?/n다른이메일로 받고 싶다면/n주소를 변경해주세요."
            confirmText="이메일 보내기"
            cancelText="취소하기"
            confirmCallbackFunction={sendEmail}
            cancelCallbackFunction={()=>setConfirmEmailPopup(false)}
          />
        )
      }


      { //toast popup
        toastPopup && (
          <ToastPopup 
            text={"이메일로 원페이저가 전송되었습니다!"} 
            bgColor={"#4D99DE"} textColor={"#FFFFFF"} 
          />
        )
      }



      <Footer></Footer>
    </div>
     
    </>
  )
}
export default OnePagerMain 