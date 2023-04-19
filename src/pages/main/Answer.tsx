import Header from "components/auth/Header";
import { useLocation } from "react-router";
import 'assets/pages/main/answerContents.css'
import AnswerNowStep from "components/main/AnswerNowStep";


const Answer = () => {
  const location = useLocation();
  const itemIndex:number = location.state.itemIndex;
  //index, q
  //const result = fetch('/api/getCardInfo', itemIndex)  //카드 정보 조회
  // const cardInfo = result.data
  const cardInfo = {
    index: itemIndex,
    q: '질문입니다?'
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
            <textarea name="" id="" cols={30} rows={10} ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default Answer;