import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import moment from 'react-moment'
import RightArrow from 'assets/images/right-arrow.png'
import useAuthStore from 'store/modules/Auth';
import useAnsweredList from 'store/modules/Answers';

/**
 * @설명 캘린더
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 캘린더 전체 내용 출력
 * @todo 구현 항목 한참 남음
 */
const MyCalendar = () => {
  const {qnaDateList, getQnaDateList, updateIsThisMonth, getOneDayQnaDateList} = useAnsweredList()
  const {userInfo} = useAuthStore((state) => state);
  
  const [selectedDate, setValue] = useState<Date>(new Date())            //calendar - 선택일자
  const today = new Date()
  const [textlabelControl, setTextLabel] = useState<Date>(today)         // [선택,오늘] 라벨 제어
  const todayYearMonth = getYearAndMonth(today)                          //금일 연월
  const todayMonth = today.getMonth() + 1                                //이번달
  const minDate = today.getDate()                                        //오늘이후날짜 비활성화 -> 내일날짜
  const [showCalendar, setShowCalendar] = useState<boolean> (true)       //calendar 보이기 숨기기 처리
  const [activeCalendarBtn, setActiveCalendarBtn] = useState<boolean>(true) //calendar 보이기숨기기 버튼 - active/disabled 처리

  const [mark, setMark] = useState<Array<string>>([])
  const todayMonth = new Date().getMonth() + 1                                //이번달
  const minDate = new Date().getDate()                                        //오늘이후날짜 비활성화 -> 내일날짜


  /****************************************************************************
   * 오늘 날짜 관련 요소 사용 - 캘린더관련
   ****************************************************************************/
  //day 클릭 이벤트
  const updateDate = (nextValue:any) => {
    setTextLabel(nextValue)                  //[선택-오늘]변경제어
    setValue(nextValue)                      //현재선택된날짜설정
    getDayData(nextValue)                    //전체목록 초기화 및 재조회
    
    //리스트만보기 버튼 disabled
    // const isToday = isSameDay(nextValue, today)
    // isToday ? setActiveCalendarBtn(true) : 
    setActiveCalendarBtn(false)
  }


  // [월] 이동 이벤트 - RightArrow control
  const CheckIsThisMonth = ({action, activeStartDate, value, view} : any) => {
    setActiveCalendarBtn(true)                  //리스트만보기 버튼 active
    setTextLabel(activeStartDate)                             //라벨영역제어
    getMonthData(activeStartDate)                             //월간데이터 조회
    if (getYearAndMonth(activeStartDate) >= todayYearMonth) { //활성화된날짜 >= 오늘연월 ?
      updateIsThisMonth(true)                                 //원페이저 다운로드 표시
    } else {
      setNextArrowActive(true)
    }
  }

  // [월] 이동 이벤트 - 목록 초기화 & 해당 월의 데이터 목록 조회 (질문중)
  const clearList = ({activeStartDate}:any) => {  //변경된 일자의 최소 일자
    const watchingViewMonth = new Date(activeStartDate).getMonth() + 1    //view 로 보고 있는 해당 [월]
    //const result = fetch('/api/getAnswerList', watchingViewMonth)       //db connection
    console.log(watchingViewMonth + '월에 해당하는 데이터 조회')
    
  }

  // 해당 월의 [일] 데이터 목록 조회
  const getDayData = (date:Date) => {
    const param = {email: userInfo.eml, month: date}
    getOneDayQnaDateList(param)
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

  /****************************************************************************
   * 일반 기능 함수
   ****************************************************************************/
  // 달력 보이기/숨기기 처리 
  const controlCalendarArea = () => {
    const calendarContent = document.getElementsByClassName('react-calendar__viewContainer')[0] as HTMLBodyElement
    const calendarLabels = document.getElementById('calendarLabels') as HTMLBodyElement
    calendarContent.style.display = showCalendar ? 'none' : 'block'   //true -> hide, false -> show
    calendarLabels.style.display = showCalendar ? 'none' : 'flex'   //true -> hide, false -> show
    setShowCalendar(!showCalendar)                                    //state 변경
  }

  useEffect(()=>{
    updateCalendarWithDesign()
  }, [textlabelControl])

  //date format 변경
  const transformDate = ({date, locale}:any) => {
    const day:string = (new Date(date).getMonth() + 1).toString()                    //월-문자화
    const newDay:string = day.length === 1 ? '0' + day : day
    const newDate:string = new Date(date).getFullYear().toString() + '. ' + newDay + '.'    
    return newDate
  }

  return (
    <>
      <div className='calendar-wrap'>
        {/* 달력 */}
        <Calendar
          className="custom-calendar"
          onChange={updateDate} 
          value={selectedDate} 
          navigationLabel={({ date, label, locale, view }) => transformDate({date, locale}) }
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
              const index = qnaDateList.findIndex(item => item.date.substring(8).replace(/(^0+)/, "") === date.getDate().toString())
              if (index > -1) {
                return 'cal-item-' + qnaDateList[index].count
              }
            }
          }
          onActiveStartDateChange={({action, activeStartDate, value, view}) => CheckIsThisMonth({activeStartDate})} //[월]이동 이벤트
        />

        {/* 달력 숨기기 버튼 */}
        <div className='calendar-aside-btn-wrap'>
          <button 
            className='btn-p-xs caption1-bold' 
            onClick={controlCalendarArea}
            disabled={!activeCalendarBtn}
          >
            {// 1. 캘린터 보일 경우/ 안보일 경우      - text
             // 2. 날짜를 선택했을 경우 / 안했을 경우 - disabled
              showCalendar ? '리스트만 보기': '캘린더도 보기'
            }
            </button>
        </div>
      </div>

      {/* 하단 라벨 영역 */}
      <div className='answer-list-labels-wrap' id='calendarLabels'>
        {
          getYearAndMonth(textlabelControl) <= todayYearMonth && (  //선택일자 <= 금일자
            <div className='answer-list-labels caption1-bold'>
              <img src={SELECT_ICON} alt="" width={12} height={12}/>
              {
                isSameDay(textlabelControl, today)
                 ? (
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