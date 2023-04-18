
import Header from "components/auth/Header";
import { useLocation } from "react-router";

const Answer = () => {
  const location = useLocation();
  const itemIndex:number = location.state.itemIndex;
  //index, q
  //const result = fetch('/api/getCardInfo', itemIndex)  //카드 정보 조회
  // const cardInfo = result.data
  const cardInfo = {
    index: itemIndex,
    q: '질문입니다?'
  }
  return (
    <>
      <div>
        <Header />
        
      </div>
    
    </>
  )
}

export default Answer;