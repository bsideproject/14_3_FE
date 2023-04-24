import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'
import NowSelectionStep from "components/main/NowSelectionStep"
import NavigationBar from "components/NavigationBar"
import TodayDate from "components/main/TodayDate"
import Footer from "components/Footer"
import Header from "components/auth/Header"
import useCardState from "store/modules/CardState"
import TodayAnswerCompleted from "components/main/TodayAnswerCompleted"

/**
 * @설명 카드 뽑기 메인 화면
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const MainContent = () => {
  const {todayCardSelectStatus} = useCardState()  //카드 선택 가능여부
  if (!todayCardSelectStatus) {  //더이상 안될경우 (3개초과)
    return (
      <>
        <div className="main-content-area">
          <Header isLeftArrow={false} /> {/* 헤더 */}
          <TodayAnswerCompleted />
          <Footer type={false}/>
          <NavigationBar />   {/* 네비게이션 바 */}
        </div>
      </>
    )
  } else {
    return (
        <>
          <div className="main-content-area">
            <Header isLeftArrow={false} /> {/* 헤더 */}
            <TodayDate />      {/* 금일자, 사용자정보 */}
            <NowSelectionStep /> {/* 잔여 선택회수 */}
            <SelectionCard />  {/* 카드 4개 출력 */}
            <Footer type={false}/>
            <NavigationBar />   {/* 네비게이션 바 */}
          </div>
        </>
      )
  }
  
}

export default MainContent