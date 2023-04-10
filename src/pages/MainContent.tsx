import DefaultHeader from "components/auth/DefaultHeader"
import LeftSelection from "components/main/LeftSelection"
import LeftTime from "components/main/LeftTime"
import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'


const MainContent = () => {
  
  return (
    <>
      <div className="main-content-area">
        <DefaultHeader /> {/* 헤더 */}
        <LeftTime />      {/* 잔여 답변개수 */}
        <LeftSelection /> {/* 잔여 선택회수 */}
        <SelectionCard />  {/* 카드 4개 출력 */}
        {/* Footer */}
        <div className="footer">
          footer
        </div>
      </div>
    </>
  )
}

export default MainContent