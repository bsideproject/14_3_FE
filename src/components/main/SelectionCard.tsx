import 'assets/pages/main/mainContent.css'
import Cards from './Cards';
import { useEffect, useState } from 'react';
import fetch from 'utils/fetch';
import { useNavigate } from 'react-router';
import DinnerImg from 'assets/images/main/category-dinner.png'
import FlowerImg from 'assets/images/main/category-flower.png'
import LampImg from 'assets/images/main/category-lamp.png'
import BookImg from 'assets/images/main/category-book.png'
import ExcerciseImg from 'assets/images/main/category-exercise.png'
import ShowerImg from 'assets/images/main/category-shower.png'
import SelectedBook from 'assets/images/main/category-selected-book.png'
import SelectedDinner from 'assets/images/main/category-selected-dinner.png'
import SelectedExcercise from 'assets/images/main/category-selected-exercise.png'
import SelectedFlower from 'assets/images/main/category-selected-flower.png'
import SelectedLamp from 'assets/images/main/category-selected-lamp.png'
import SelectedShower from 'assets/images/main/category-selected-shower.png'


const testData = [
  {index: 251521, q: 'Question 1 ?', img: DinnerImg, desc: 'dinner', aftrImg: SelectedDinner},
  {index: 124452, q: 'Question 1 ?', img: FlowerImg, desc: 'flower', aftrImg: SelectedFlower},
  {index: 125622, q: 'Question 1 ?', img: LampImg, desc: 'lamp', aftrImg: SelectedLamp},
  {index: 746432, q: 'Question 1 ?', img: BookImg, desc: 'book', aftrImg: SelectedBook},
  // {index: 746432, q: 'Question 1 ?', img: BookImg, desc: 'exercise', aftrImg: SelectedExcercise},
  // {index: 746432, q: 'Question 1 ?', img: BookImg, desc: 'shower', aftrImg: SelectedShower},
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