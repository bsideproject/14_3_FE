import Header from "components/auth/Header";
import { useLocation } from "react-router";
import 'assets/pages/main/answerContents.css'
import AnswerNowStep from "components/main/AnswerNowStep";
import { useState } from "react";
import ConfirmPopup from "components/ConfirmPopup";
import fetch from "utils/fetch";
import useAuthStore from "store/modules/Auth";
import AlertTextPopup from "components/AlertTextPopup";
import { useNavigate } from "react-router-dom";


const Answer = () => {
  /******************************************************************/
  /* @desc 질문                                                     */
  /******************************************************************/
  const location = useLocation();
  const navigate = useNavigate();
  const itemIndex:number = location.state.itemIndex;
  //index, q
  //const result = fetch('/api/getCardInfo', itemIndex)  //카드 정보 조회
  // const cardInfo = result.data
  const cardInfo = {
    index: itemIndex,
    q: '질문입니다?'
  }
  

  /******************************************************************/
  /* @desc 답변                                                     */
  /******************************************************************/
  const [answer, setAnswer] = useState<string>('')               //답변
  const [isError, setIsError] = useState<boolean>(false)         //에러
  const [btnActive, setBtnActive] = useState<boolean>(true)      //버튼제어

  //답변 작성 핸들러
  const handleAnswer = ({target}:any) => { 
    setAnswer(target.value)
    if (target.value.length > 270 ) {
      setIsError(true);   //에러출력
      setBtnActive(true); //버튼제어
    } else {
      setIsError(false);    //에러없애기
      setBtnActive(false);  //버튼제어
    }
    if(target.value.length === 0) { //버튼제어
      setBtnActive(true);
    }
  }

  /******************************************************************/
  /* @desc 답변 저장로직                                             */
  /******************************************************************/
  const [saveClicked, setSaveClicked] = useState<boolean>(false) //저장버튼 클릭여부
  // const {isLogin} = useAuthStore((state) => state);           //사용자계정정보 조회 -> isLogin
  const [isSaved, setIsSaved] = useState<boolean>(false)         //DB연동 성공여부 (저장성공)
  const [needToLogin, setNeedToLogin] = useState<boolean>(false) //로그인안했을 경우 출력 confirm 팝업 처리

  //1.답변 저장여부 체크 - confirm popup
  const handleSave = () => {
    setSaveClicked(true)  //confirmpopup 출력
  }

  //2.로그인 체크
  const loginCheck = () => {
    setSaveClicked(false) //팝업 닫기
    const isLogin = true
    //로그인 여부에 따라 [저장, 로그인유도]
    isLogin ? insertAnswer() : setNeedToLogin(false)
  }

  // 로그인 되었을 경우
  //2.답변 저장 - api 호출 - callbackfunction
  const insertAnswer = () => {
    const param:ANSWER_CONTENT = {
      itemIndex,      //질문 index
      answer          //답변 내용
    }
    console.log(param)    //전달내용출력
    /******************************************************************/
    /* @desc 답변 저장 서비스 호출                                      */
    /******************************************************************/
    // const result: any = fetch('/api/insertAnswer', param)  
    // const resultInfo = result.data
    // if(resultInfo === 1) {  //성공 시
    setIsSaved(true)    //저장 성공 세팅 
    // }
  }

  //로그인 안했을 경우
  //로그인 어쩌구 저쩌구 출력
  const goToLogin = () => {
    const param:ANSWER_CONTENT = {
      itemIndex,      //질문 index
      answer          //답변 내용
    }
    localStorage.removeItem('goming-setAnswer')                 //localStorage에 저장되어있던 답변 항목이 있다면 제거
    localStorage.setItem('goming-setAnswer', param.toString()); //localStorage에 저장
    navigate('/login')  //로그인페이지로 이동
  }

  //다음 질문 카드 뽑으러 가기
  const goToNextQuestion = () => {
    navigate('/main', {replace:true})   //새로운 카드 출력 or 캘린더 화면으로 이동처리
  }


  /******************************************************************/
  /* @desc 질문 건너뛰기                                             */
  /******************************************************************/
  const [skipPopup, setSkipPopup] = useState<boolean>(false);
  //질문건너뛰기
  const skipThisQuestion = () => {
    navigate('/main', {replace:true})
  }

  return (
    <>
      <div>
        <Header title={"답변 작성하기"} />
        
        <div className="answer-wrap">
          <div className="question-wrap">
            {/* 질문 컴포넌트 */}
            <AnswerNowStep />
            {/* 질문 내용 */}
            <p className="question-content body1-bold">내가 인생에서 놓쳐서 아쉬운 게 있다면 어떤 건가요?, 나는 삶에서 어떤 것을 자주 놓치나요?(예: 가족과 보내는 시간, 건강
              최대 4줄을 작성할 수 있으며, ui 화면길이에 따라 바뀝니다.</p>
          </div>

          {/* 답변영역 */}
          <div className="answer-content">
            <textarea 
              value={answer} 
              onChange={handleAnswer}  
              placeholder="클릭해서 나의 답변을 작성해보세요!"
              className="common-textarea body2-regular"
              maxLength={271}
              >
              {answer}
            </textarea>
            <div className='answer-comment-area' >
              {
                isError ? (<p className="answer-error-text caption2-bold answer-error" >270자 이하로 적어주세요.</p>) : (<p className="answer-error-text caption2-bold">&nbsp;</p>)
              }
              <p className={'answer-text-count caption2-bold ' + (isError ? 'answer-error' : '')}>{answer.length}/270</p>
            </div>
          </div>

          <div className="answer-btn-area">
            <button 
              type="button" 
              disabled={btnActive} 
              className="answer-btn-confirm" 
              onClick={handleSave}
              >저장하기</button>
            <button type="button" className="answer-btn-cancel" onClick={()=>setSkipPopup(true)}>이번 질문은 넘어갈래요</button>
          </div>
        </div>
      </div>

      {/* 1.답변 저장여부 체크 - 저장하기 버튼 클릭 시 confirm popup 출력 */
        saveClicked && (
          <ConfirmPopup 
            strongText="작성하신 내용을 저장할까요?"            //강조문구
            text="저장 후에는 수정이 불가하며, 저장된 회고록은 월말에 확인할 수 있게 됩니다."   //일반 텍스트 문구
            confirmText="저장하기"                             //confirm 문구
            cancelText="돌아가기"                              //cancel 문구
            callbackFunction={loginCheck}                     //confirm 확인
            closeCallbackFuntion={()=>setSaveClicked(false)}  //cancel 팝업 닫기
          />
        )
      }

      {/* 2.로그인 했을 경우 출력 */
        isSaved && (
          <AlertTextPopup 
            strongText="작성하신 오늘의 회고가 저장되었습니다."     //강조문구
            text="참 잘했어요:)"                                  //일반문구1
            text2="이제 다음 질문을 선택하러 가볼까요?"            //일반문구2
            confirmText="질문 선택하러 가기"                      //confirm 문구
            callbackFunction={goToNextQuestion}                 //cancel 팝업 닫기
          />
        )
      }

      {/* 2.로그인 안했을 경우 출력 */
        needToLogin && (
          <ConfirmPopup 
            text="잠깐! 작성하신 내용을 저장하기 위해서는 로그인이 필요합니다!"   //일반 텍스트 문구
            confirmText="로그인 하러 가기"                             //confirm 문구
            cancelText="일단 계속 둘러보기"                            //cancel 문구
            callbackFunction={goToLogin}                              //confirm 확인
            closeCallbackFuntion={()=>setNeedToLogin(false)}          //cancel 팝업 닫기
            isFlex={false}
          />
        )
      }

      {/* skip 눌렀을 경우 */
        skipPopup && (
          <ConfirmPopup 
            strongText="지금 이 페이지를 나가면 다시 돌아올 수 없어요!"
            text="또한, 오늘의 질문 선택 기회도 그대로 1회 차감됩니다. 그래도 다음 질문 선택 페이지로 가시겠어요?"   //일반 텍스트 문구
            confirmText="질문 선택하러 가기"                    //confirm 문구
            cancelText="돌아가기"                              //cancel 문구
            callbackFunction={skipThisQuestion}               //confirm 확인
            closeCallbackFuntion={()=>setSkipPopup(false)}    //cancel 팝업 닫기
            isFlex={false}
          />
        )
      }


    </>
  )
}

type ANSWER_CONTENT = {
  itemIndex: number
  answer: string
}

export default Answer;