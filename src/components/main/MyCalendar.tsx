import { useEffect, useState } from 'react';
// import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import moment from 'react-moment'
import LeftArrow from 'assets/images/left-vector.png'
import RightArrow from 'assets/images/right-vector.png'
import {SELECT_ICON, ANSWER_STEP_1,ANSWER_STEP_2,ANSWER_STEP_3} from './MyCalendar-Images.js'
import 'assets/components/answered-list/custom-calendar.css'
import useAnsweredList from 'store/modules/Answers';

/**
 * @설명 캘린더
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 캘린더 전체 내용 출력
 * @todo 구현 항목 한참 남음
 */
const MyCalendar = () => {
  const {qnaDateList, getQnaDateList, updateIsThisMonth} = useAnsweredList()
  const [selectedDate, setValue] = useState<Date>(new Date())                 //calendar - 선택일자
  const [nextArrowActive, setNextArrowActive] = useState<boolean>(false)      //calendar - 다음달클릭 Arrow IMG 설정용
  const today = new Date()
  const [textlabelControl, setTextLabel] = useState<Date>(today)          // [선택,오늘] 라벨 제어
  const todayMonth = today.getMonth() + 1                                //이번달
  const minDate = today.getDate()                                        //오늘이후날짜 비활성화 -> 내일날짜
  const [mark, setMark] = useState<Array<string>>([])

  //특정일자 클릭 이벤트
  const updateDate = (nextValue:any) => { //:type=new Date()
    setValue(nextValue)
  }

  // [월] 이동 이벤트 - RightArrow control
  const isThisMonth = ({action, activeStartDate, value, view} : any) => {
    setTextLabel(activeStartDate)           //라벨영역제어

    const selectedMonth = activeStartDate.getMonth() + 1
    if (activeStartDate.getMonth()+1 >= todayMonth) {
      setNextArrowActive(false)   //다음달표시안함
      updateIsThisMonth(true)    //원페이저 다운로드 표시
    } else {
      setNextArrowActive(true)   //다음달표시
      updateIsThisMonth(false)    //남은기간표시
    }
  }

  // [월] 이동 이벤트 - 목록 초기화 & 해당 월의 데이터 목록 재조회
  const clearList = ({value}:any) => {  //변경된 일자의 최소 일자
    const watchingViewMonth = new Date(value).getMonth() + 1    //view 로 보고 있는 해당 [월]
    //const result = fetch('/api/getAnswerList', watchingViewMonth)       //db connection
    console.log(watchingViewMonth, '월에 해당하는 데이터 조회')
  }

  /****************************************************************************
   * 데이터 설정
   ****************************************************************************/

  /**
   * @desc 데이터가 있는 날짜의 nodeList를 체크 -> 값과 비교 -> 클래스 추가
   */
  const updateCalendarWithDesign = () => {
    const dayLists = Array.from(document.querySelectorAll('abbr'))  //노드item
    dayLists.forEach((item, index) => {
      if (index < 7) {
        item.classList.add('body3-regular') //[월-일] 폰트 지정
      } else {
        item.classList.add('body3-bold')    //일자 폰트 지정
      }
    })
  }

  // getQnaDateList()    //date, count 포맷 데이터 조회
  useEffect(()=>{
    updateCalendarWithDesign()
  }, [qnaDateList])

  return (
    <>
       <Calendar
        className="custom-calendar"
        onChange={updateDate} 
        value={selectedDate} 
        formatDay={(locale, date) => date.getDate().toString()}
        prevLabel = {<img src={LeftArrow} alt={"<"} width={24} height={24} /> }
        prev2Label={null}           //첫달선택  << 없애기
        nextLabel = {<img src={RightArrow} alt={">"} width={24} height={24} /> }
        next2Label={null}           //마지막달선택 >> 없애기
        minDetail="month"           //최소 디테일 : [월]
        maxDetail={'month'}         //최대 디테일 : [월]
        locale={'ko'}
        showNeighboringMonth={false}   //이전,이후 날짜 show/hide
        //tile 스타일지정
        tileClassName={
          ({ date, view }) => {
            console.log(qnaDateList[0])
            const index = qnaDateList.findIndex(item => item.date.substring(8).replace(/(^0+)/, "") === date.getDate().toString())
            if (index > -1) {
              return 'cal-item-' + qnaDateList[index].count
            }
          }
        }
        //[월]이동 이벤트
        onActiveStartDateChange={({action, activeStartDate, value, view}) => isThisMonth({activeStartDate})
        }
        onClickDay={(value, event) => clearList({value})}       //day 클릭 이벤트
        // tileContent={({activeStartDate, date}) => 
        //   qnaDateList.map(qd => new Date(qd).getDate() === date.getDate() ? (<div className='hasinfo'>ㅇ</div>): null)
        // }
      />


      {/* 하단 라벨 영역 */}
      <div className='answer-list-labels-wrap'>
        {
          textlabelControl.getMonth() + 1 <= todayMonth && (
            <div className='answer-list-labels caption1-bold'>
              <img src={SELECT_ICON} alt="" width={12} height={12}/>
              {
                textlabelControl.getMonth() + 1 === todayMonth ? (
                  /* 1. 당월 시점 */
                  <span>오늘</span>
                ) : (
                  /* 2. 전월 시점 */
                  <span>선택</span>
                ) 
              }
            </div>
          )
        }  {/* 3. 미래 시점 : 표시안함*/}    
        
        <div className='answer-list-labels caption1-bold'>
          <img src={ANSWER_STEP_1} alt="" width={12} height={12} />
          답변1회
        </div>
        <div className='answer-list-labels caption1-bold'>
          <img src={ANSWER_STEP_2} alt="" width={12} height={12} />
          답변2회
        </div>
        <div className='answer-list-labels caption1-bold'>
          <img src={ANSWER_STEP_3} alt="" width={12} height={12} />
          답변3회
        </div>
      </div>
    </>
  )
}

export default MyCalendar