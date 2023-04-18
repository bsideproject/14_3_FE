import DefaultHeader from "components/auth/DefaultHeader"
import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'
import NowSelectionStep from "components/main/NowSelectionStep"
import NavigationBar from "components/NavigationBar"
import TodayDate from "components/main/TodayDate"
import Footer from "components/Footer"

const MainContent = () => {
  return (
    <>
      <div className="main-content-area">
        <DefaultHeader type={false} /> {/* 헤더 */}
        <TodayDate />      {/* 잔여 답변개수 */}
        <NowSelectionStep /> {/* 잔여 선택회수 */}
        <SelectionCard />  {/* 카드 4개 출력 */}
        <Footer type={false}/>
        <NavigationBar />   {/* 네비게이션 바 */}
      </div>
    </>
  )
}

export default MainContent