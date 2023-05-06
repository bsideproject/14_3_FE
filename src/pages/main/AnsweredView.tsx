import { useEffect, useState } from "react"
import useDefaultSets from "store/modules/Defaults"
import 'assets/pages/main/answeredView.css'
import { useLocation } from "react-router-dom"
import fetch from "utils/fetch"
import DateFormatUI from "components/main/DateFormatUI"
import AnsweredCategoryUI from "components/main/AnsweredCategoryUI"
import Header from "components/auth/Header"
import Footer from "components/Footer"
import NavigationBar from "components/NavigationBar"

const testData = {
    index: 124156,
    date: "2023-04-11",
    qc: 'exploration',   //나의탐구
    q: '질문입니다?질문입니다?질문입니다?질문입니다?질문입니다?',
    a: '답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?'
  }
/**
 * @desc 답변 상세 화면
 * @desc 만약 데이터 조회가 안될 시 이전페이지로 이동 하도록 처리
 */
const AnsweredView = () => {
  const {setHeaderText, setIsNavigation} = useDefaultSets()          //header
  const location = useLocation()                    //parameter
  const state = location.state as { a_num: number; };
  const a_num = state.a_num                         //getParameter
  const [answer, setAnswer] = useState<ANSWER>({
    index: 0,
    date: '',
    qc: '',
    q: '',
    a: ''
  })  //answer

  useEffect(() => {
    setHeaderText('답변 상세 보기')
    setIsNavigation(false)
    // 전달받은 값이 존재하지 않을경우
    if (!a_num) {
      window.history.back()
    } else {
      //전달 받은 값을 상세조회
      const param = {
        a_num: a_num
      }
      //const result = fetch('/api/getAnswerInfo', param)
      // setAnswer(result?.data?.answerInfo)  //state 에 저장
      //임시
      setAnswer(testData)
    }

    return () => setHeaderText()
  },[])

  //

  return (
    <>
      <div className="answered-view-wrap">
          <Header></Header>
          <div className="answered-view-inner-wrap">
            <div className="answered-list-item-header-wrap caption1-regular">
              <DateFormatUI date={answer?.date} />
              <AnsweredCategoryUI category={answer?.qc} />
            </div>
            <div className="body1-bold answered-list-item-q">
              {answer?.q}
            </div>
            <div className="body2-regular answered-view-item-a">
              {answer?.a}
            </div>
          </div>
      </div>
      <Footer></Footer>
    </>
  )
}

// answer 타입 선언
type ANSWER = {
  index: number
  date: string
  qc: string
  q: string
  a: string
}

export default AnsweredView