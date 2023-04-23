import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import moment from 'react-moment'
import RightArrow from 'assets/images/right-arrow.png'

/**
 * @설명 캘린더
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 캘린더 전체 내용 출력
 * @todo 구현 항목 한참 남음
 */
const MyCalendar = () => {
  const [selectedDate, setValue] = useState(new Date())                       //calendar - 선택일자
  const [nextArrowActive, setNextArrowActive] = useState<boolean>(false)      //calendar - 다음달클릭 Arrow IMG 설정용
  const [mark, setMark] = useState<Array<string>>([])
  const todayMonth = new Date().getMonth() + 1                                //이번달
  const minDate = new Date().getDate()                                        //오늘이후날짜 비활성화 -> 내일날짜


  //특정일자 클릭 이벤트
  const updateDate = (nextValue:any) => { //:type=new Date()
    setValue(nextValue)
  }


  // [월] 이동 이벤트 - RightArrow control
  const isThisMonth = ({action, activeStartDate, value, view} : any) => {
    console.log('이동이벤트', { action, activeStartDate, value, view })
    const selectedMonth = new Date(activeStartDate).getMonth() + 1
    if (selectedMonth >= todayMonth) {
      setNextArrowActive(false)
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
  
  // setMark(testData)
  return (
    <>
       <Calendar
        onChange={updateDate} 
        value={selectedDate} 
        nextLabel = {nextArrowActive ? (
          <img src={RightArrow} alt={">"} width={24} height={24} />
        ): null}
        next2Label={null}           //마지막달선택 >> 없애기
        prev2Label={null}           //첫달선택  << 없애기
        maxDetail={'month'}         //최대 디테일 : [월]
        onActiveStartDateChange={({activeStartDate}) => {   //[월]이동 이벤트
          clearList(activeStartDate)
          isThisMonth({activeStartDate})
        }}
        // tileDisabled={tileDisabled}
        // tileContent={({date,view}) => {
        //   if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
        //     return (
        //       <>
        //         <div className='dot'></div>
        //       </>
        //     )
        //   }
        // }}
      />
    </>
  )
}

export default MyCalendar