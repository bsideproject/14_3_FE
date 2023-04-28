import { useEffect, useState } from "react"
import useAnsweredList from "store/modules/Answers"
import 'assets/components/answered-list/answered-list.css'
import AnsweredCategoryUI from "./AnsweredCategoryUI";
import { useNavigate } from "react-router-dom";
import DateFormatUI from "./DateFormatUI";

/**
 * @설명 답변목록 출력
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 사용자가 답변한 내용 출력 리스트 5개 단위
 */
const AnsweredListContent = () => {
  const [answeredList, setAnsweredList] = useState<any>([{}])       //Q&A 목록
  const {qnaList} = useAnsweredList()
  const navigate = useNavigate()

  useEffect(() => {
    setAnsweredList(qnaList)
  }, qnaList) //qnaList 가 업데이트 될 때마다 리렌더링

  //상세페이지로 이동
  const viewAnswer = (a_num:number):void => {
    console.log(a_num)
    navigate('/answered-view', { state: {a_num: a_num} })
  }

  return (
    <>
      <div className="answered-list-wrap">

        {/* 목록 개수 출력 */}
        <div className="answered-list-item-count-wrap body2-bold">
          총 <span className="answered-list-count-text">{answeredList.length}개</span>의 답변이 있습니다.
        </div>

        {/* 목록 내용 출력 */}
        <div>
          { answeredList.length > 0 && (  //목록이 있을 경우에만 노출
              answeredList.map((item:any) => (
                <div key={item.index} className="answered-list-item" onClick={()=>viewAnswer(item.index)}>
                  <div className="answered-list-item-header-wrap caption1-regular">
                    <DateFormatUI date={item.date} />
                    <AnsweredCategoryUI category={item.qc} />
                  </div>
                  <div className="answered-list-item-q body2-bold">{item.q}</div>
                  <div className="body3-regular answered-list-item-a ">{item.a}</div>
                </div>
              ))
            )
          }
        </div>

      </div>
            
    </>
  )
}

export default AnsweredListContent 