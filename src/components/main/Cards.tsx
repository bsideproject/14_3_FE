
import {CSSTransition} from 'react-transition-group';
import { useState, useRef } from 'react';

const Cards = ({item}: any) => {
  const nodeRef = useRef(null);
  const [showFront, setShowFront] = useState(true)
  return (
    <>
    <CSSTransition 
            nodeRef={nodeRef}
            in={showFront}
            timeout={300}
            classNames='flip'
          >
            <div ref={nodeRef} className='card' onClick={() => {
              setShowFront(!showFront);
              }}>
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