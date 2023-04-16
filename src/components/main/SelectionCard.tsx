import 'assets/pages/main/mainContent.css'
import Cards from './Cards';
import { useEffect, useState } from 'react';
import fetch from 'utils/fetch';
import { useNavigate } from 'react-router';

const testData = [
  {index: 251521, q: 'Question 1 ?'},
  {index: 121312, q: 'Question 2 ?'},
  {index: 123125, q: 'Question 3 ?'},
  {index: 123512, q: 'Question 4 ?'}
]
const SelectionCard = () => {
  const navigate = useNavigate()
  //const [cards, setCards] = useState<Object>({})          //카드 목록
  const [selected, setSelected] = useState<boolean>(false)  //카드 선택 확인용
  const clickedEventHandler = () => {
    setSelected(true)
  }
  useEffect(() => {
    //1.카드선택상태조회
    // const cardSelectStatus = fetch('/api/getCardSeletion', email)
    // cardSelectStatus.data.map((item) => { //카드선택내용 (최대 3회 반복) 확인
    //   if (item.status === 1) {  //카드답변을 안했을 경우
    //     return navigate(`/answer/${item.cardIndex}`, {replace: true})   //history 삭제 후 이동
    //   }
    // })

    //2.카드목록조회
    // const newCards = fetch('/api/getCards', email)
    // setCards(newCards.data) //card 세팅
  },[])
  return (
    <>
      <div className='main-card-area'>
        { 
        testData.map(item => (
          <Cards key={item.index} item={item} selected={selected} clickedEventHandler={clickedEventHandler} />
        ))
        }
      </div>

    </>
  )
}

export default SelectionCard