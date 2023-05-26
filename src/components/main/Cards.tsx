
import {CSSTransition} from 'react-transition-group';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useCardState from 'store/modules/CardState';
import GomingTextImg from 'assets/images/main/goming-text.png'

const Cards = ({item, selected, clickedEventHandler}: any) => {
  const navigate = useNavigate()
  const nodeRef = useRef(null)
  const [showFront, setShowFront] = useState(true)

  //카드 선택 이벤트
  const clickHandler = (item: any) => {
    /*********************************************
     * style 설정
     *********************************************/
    const id = item.index.toString()
    const selectedItem = document.getElementById(id) as HTMLElement
    selectedItem.style.backgroundColor = '#2D4577'

    //카드 선택 시 모든 카드 클릭이벤트 제거
    const cards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.pointerEvents = 'none'
    }

    if (selected === false) {
      setShowFront(false); 
      //카드 선택 api 호출 (db저장)
      //하루 선택 횟수 -1          (db저장)
      const selectedInfo = {
        email: 'guest',           //이메일정보
        itemIndex: item.index,    //선택한 카드의 index
      }
      
      clickedEventHandler()
      setTimeout(() => {
        navigate('/answer', 
          {
            state: {itemIndex: item.index}, 
            replace: true
          })
      }, 1500);
    }
  }
  return (
    <>
      <CSSTransition 
        nodeRef={nodeRef}
        in={showFront}
        timeout={300}
        classNames='scaling'
      >
        <div ref={nodeRef} className='card' onClick={() => clickHandler(item)}>
          {/* 카드 앞면 내용: 컨텐츠 */}
          <div className='card-front'>
            <div className='card-in' id={item.index}>
              {
                showFront ? (
                  <img src={item.img} alt={item.desc} width={'100%'} className="card-scale"/>
                ) : (
                  <div className='selected-card-area card-fade'>
                    <img src={item.aftrImg} alt={item.desc} width={'100%'} className='card-fade' />
                  </div>
                )
              }
            </div>
            <div className='card-title'>
              <img src={GomingTextImg} alt="" width={48} height={12}/>
            </div>
          </div>
        </div>
      </CSSTransition>
      
    </>
  )
}

export default Cards