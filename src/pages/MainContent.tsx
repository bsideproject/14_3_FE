import DefaultHeader from "components/auth/DefaultHeader"
import LeftTime from "components/main/LeftTime"
import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'
import NowSelectionStep from "components/main/NowSelectionStep"
import NavigationBar from "components/NavigationBar"

const MainContent = () => {
  return (
    <>
      <div className="main-content-area">
        <DefaultHeader /> {/* 헤더 */}
        <LeftTime />      {/* 잔여 답변개수 */}
        <NowSelectionStep /> {/* 잔여 선택회수 */}
        <SelectionCard />  {/* 카드 4개 출력 */}
        <NavigationBar />   {/* 네비게이션 바 */}
      </div>
    </>
  )
}

export default MainContent