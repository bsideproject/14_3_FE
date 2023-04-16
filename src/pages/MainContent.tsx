import DefaultHeader from "components/auth/DefaultHeader"
import LeftSelection from "components/main/LeftSelection"
import LeftTime from "components/main/LeftTime"
import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'
import { useEffect, useState } from "react"
import fetch from "utils/fetch"

const MainContent = () => {
  const [todayLeftCount, setTodayLeftCount] = useState<number>(3);
  useEffect(()=> {
    // 잔여 질문 뽑기 횟수 조회
    //  fetch('/api/getLeftSelection')
    setTodayLeftCount(3)
  })
  return (
    <>
      <div className="main-content-area">
        <DefaultHeader /> {/* 헤더 */}
        <LeftTime />      {/* 잔여 답변개수 */}
        <LeftSelection todayLeftCount={todayLeftCount} /> {/* 잔여 선택회수 */}
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