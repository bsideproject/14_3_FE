
import {CSSTransition} from 'react-transition-group';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Cards = ({item, selected, clickedEventHandler}: any) => {
  const navigate = useNavigate()
  const nodeRef = useRef(null)
  const [showFront, setShowFront] = useState(true)

  //카드 선택
  const clickHandler = (item: any) => {
    if (selected === false) {
      setShowFront(false); 
      clickedEventHandler()
      //카드 선택했다는 이벤트 호출 (db저장)
      //하루 선택 횟수 -1          (db저장)
      // const selectedInfo = {
      //   email: 'email',
      //   itemIndex: item.index,
      // }
      //fetch('/api/selectCard', selectedInfo)
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
        classNames='flip'
      >
        <div ref={nodeRef} className='card' onClick={() => clickHandler(item)}>
          {/* 카드 앞면 내용: 컨텐츠 */}
          <div className='inner-card card-front'>
            무슨카드일까요?
          </div>

          {/* 카드 뒷면 영역 */}
          <div className='outer-card card-back'>
            <h1>
              {item.index}
            </h1>
            <p>{item.q}</p>
          </div>

        </div>
      </CSSTransition>
      
    </>
  )
}

export default Cards