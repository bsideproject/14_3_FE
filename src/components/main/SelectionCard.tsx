import 'assets/pages/main/mainContent.css'
import Cards from './Cards';
import { useState } from 'react';
import {DinnerImg,
  FlowerImg,
  LampImg,
  BookImg,
  ExcerciseImg,
  ShowerImg,
  SelectedBook,
  SelectedDinner,
  SelectedExcercise,
  SelectedFlower,
  SelectedLamp,
  SelectedShower
} from './CardsImages'
import useCardState from 'store/modules/CardState';

const testData = [
  {index: 251521, q: 'Question 1 ?', img: DinnerImg, desc: 'dinner', aftrImg: SelectedDinner},
  {index: 124452, q: 'Question 1 ?', img: FlowerImg, desc: 'flower', aftrImg: SelectedFlower},
  {index: 125622, q: 'Question 1 ?', img: LampImg, desc: 'lamp', aftrImg: SelectedLamp},
  {index: 746432, q: 'Question 1 ?', img: BookImg, desc: 'book', aftrImg: SelectedBook},
  // {index: 746432, q: 'Question 1 ?', img: BookImg, desc: 'exercise', aftrImg: SelectedExcercise},
  // {index: 746432, q: 'Question 1 ?', img: BookImg, desc: 'shower', aftrImg: SelectedShower},
]
/**
 * @설명 카드 뽑기 컴포넌트 - 목록 조회
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const SelectionCard = () => {
  const [selected, setSelected] = useState<boolean>(false)  //카드 선택 확인용
  //fourCards : 4개의 카드 정보
  const {fourCards} = useCardState()  //cardState
  const clickedEventHandler = (card:any) => {
    console.log(card);
    
    setSelected(true)
  }

  return (
    <>
      <div className='main-card-area'>
        { //TODO: fourCards로 변경
        testData.map(item => (
          <Cards key={item.index} item={item} selected={selected} clickedEventHandler={clickedEventHandler} />
        ))
        }
      </div>

    </>
  )
}

export default SelectionCard