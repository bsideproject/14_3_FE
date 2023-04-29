import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'
import NowSelectionStep from "components/main/NowSelectionStep"
import TodayDate from "components/main/TodayDate"
import useCardState from "store/modules/CardState"
import TodayAnswerCompleted from "components/main/TodayAnswerCompleted"
import { useEffect } from "react"
import useDefaultSets from "store/modules/Defaults"
import Header from "components/auth/Header"
import Footer from "components/Footer"
import NavigationBar from 'components/NavigationBar'
/**
 * @설명 카드 뽑기 메인 화면
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const MainContent = () => {
  const {todayCardSelectStatus} = useCardState()  //카드 선택 가능여부
  const {setHeaderText} = useDefaultSets()

  useEffect(() => {
    setHeaderText('')
  },[])

  if (!todayCardSelectStatus) {  //더이상 안될경우 (3개초과)
    return (
      <>
        <div className="main-content-area">
          <Header></Header>
          <div style={{margin: '0 16px'}}>
            <TodayAnswerCompleted />
          </div>
        </div>
        <Footer></Footer>
          <NavigationBar />
      </>
    )
  } else {
    return (
        <>
          <div className="main-content-area">
            <Header></Header>
            <div style={{margin: '0 16px'}}>
              <TodayDate />      {/* 금일자, 사용자정보 */}
              <NowSelectionStep /> {/* 잔여 선택회수 */}
              <SelectionCard />  {/* 카드 4개 출력 */}
            </div>
          </div>
          <Footer></Footer>
          <NavigationBar />
        </>
      )
  }
  
}

export default MainContent