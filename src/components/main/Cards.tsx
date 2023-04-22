
import {CSSTransition} from 'react-transition-group';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useCardState from 'store/modules/CardState';

const Cards = ({item, selected, clickedEventHandler}: any) => {
  const navigate = useNavigate()
  const nodeRef = useRef(null)
  const [showFront, setShowFront] = useState(true)

  //카드 선택 이벤트
  const clickHandler = (item: any) => {
    if (selected === false) {
      setShowFront(false); 
      clickedEventHandler()
      //카드 선택했다는 이벤트 호출 (db저장)
      //하루 선택 횟수 -1          (db저장)
      const selectedInfo = {
        email: 'guest',           //이메일정보
        itemIndex: item.index,    //선택한 카드의 index
      }
            
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
            <div className='card-in'>
              {
                showFront ? (
                  <img src={item.img} alt={item.desc} width={148} height={136} className="card-scale"/>
                ) : (
                  <div className='selected-card-area card-fade'>
                    <img src={item.aftrImg} alt={item.desc} width={148} height={136} className='card-fade' />
                  </div>
                )
              }
            </div>
            <div className='card-title'>
              Goming
            </div>
          </div>
        </div>
      </CSSTransition>
      
    </>
  )
}

export default Cards