
import { useState } from "react"
import WithdrawalInformation from "./WithdrawalInformation"
import bullet from 'assets/images/bullet.png'
/**
 * @설명 회원탈퇴 첫번째 페이지의 내용 컴포넌트
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {number} step 단계 
 * @param {Function} setStep useState의 setStep 함수 
 */
const Withdrawal2 = ({step, setStep}: WITHDRAWAL) => {
  const [checkedList, setCheckedList] = useState<Array<string>>([]); //체크박스
  const [itemChecked, setItemChecked] = useState<boolean>(false) //아이템 체크 확인 -> 버튼 활성화용
  const [withdrawalTextArea, setWithdrawalTextArea] = useState<boolean>(true) //textarea 체크
  const [withdrawalText, setWithdrawalText] = useState<string>('') //textarea 값
  const [withdrawalTextError, setWithdrawalTextError] = useState<boolean>(false) //textarea 에러 확인 -> error 문구 출력용

  // textarea readonly control
  const updateTextArea = () => {
    setWithdrawalTextArea(!withdrawalTextArea)
  }

  // textarea keyup event
  const withdrawalTextKeyupHandler = (e:any) => {
    setWithdrawalText(e.target.value)
  }

  //체크박스 체크 확인
  const checkedHandler = (e:any) => {
    //1개이상 선택되었을 경우 확인
    const checkedboxElements = document.getElementsByName("checkbox")
    const checkedboxArray: Array<any> = Array.from(checkedboxElements)
    const checkedboxes: Array<any> = checkedboxArray.filter(item => item.checked)
    if (checkedboxes.length > 0) { 
      const newItem = checkedboxes.map(item => item.value) //체크 된 항목 값 선별
      setCheckedList(newItem) //선택리스트에 추가
      setItemChecked(true) //다음버튼 활성화
    } else {
      setItemChecked(false) //다음버튼 비활성화
    }

    //기타 버튼 체크용
    const otherCheck = document.getElementById('other') as HTMLInputElement
    if (otherCheck.checked === true) {
      document.getElementById('withdrawalTextarea')?.removeAttribute('readOnly')
    } else { //비선택시 내용 작성불가처리 및 초기화
      document.getElementById('withdrawalTextarea')?.removeAttribute('readOnly')
      document.getElementById('withdrawalTextarea')?.setAttribute('readOnly', "readOnly")
      setWithdrawalText("")
    }
  }

  // 다음단계
  const updateStep = () => {
    const otherCheck = document.getElementById('other') as HTMLInputElement
    if (otherCheck.checked === true) {
      if( withdrawalText.length < 1 ) {
        setWithdrawalTextError(true)
      } else {//내용없을시 로직 종료
        setWithdrawalTextError(false)
        return; 
      }
    }
    
    if (checkedList.length < 1) {
      return;
    } else {
      setStep(++step) //다음 컴포넌트
    }
  }
  return (
    <>
      <div className='withdrawal-content'>
        {/* 회원탈퇴 공통 텍스트 */}
        <WithdrawalInformation /> 
        <div className="withdrawal-content-info">
          <p>
            고밍을 탈퇴하시기에 앞서,<br />
            탈퇴하시는 이유를 알려주세요. <span className="withdrawal-font-size-12 color-wgray12">(중복 선택 가능)</span>
          </p>
          <div className='withdrawal-info word-break-keep-all'>
            <div>
              <img src={bullet} alt="*" style={{marginRight: '4px'}} width={4} height={4}/>
            </div>
            <p className='withdrawal-font-size-12 withdrawal-small-info'>
              불편사항을 알려주시면, 고밍이 더 나은 서비스를 만드는 데에 큰 도움이 됩니다.
            </p>
          </div>
          <div className="withdrawal-checkbox-wrap">
            <div>
              <input className="withdrawal-checkbox" name="checkbox" type="checkbox" id="nofun" onChange={checkedHandler} value={1} />
              <label htmlFor="nofun">재미가 없어요</label>
            </div>
            <div>
              <input className="withdrawal-checkbox" type="checkbox" name="checkbox" id="uncomfortable" onChange={checkedHandler} value={2}/>
              <label htmlFor="uncomfortable">불편해요 (UI/UX)</label>
            </div>
            <div>
              <input className="withdrawal-checkbox" type="checkbox" name="checkbox" id="dontUse" onChange={checkedHandler} value={3}/>
              <label htmlFor="dontUse">잘 사용하지 않아요</label>
            </div>
            <div>
              <input className="withdrawal-checkbox" type="checkbox" name="checkbox" id="noQuestionLike" onChange={checkedHandler} value={4}/>
              <label htmlFor="noQuestionLike">마음에 드는 질문이 없어요</label>
            </div>

            <div>
              {/* 클릭시 textarea 활성화처리 */}
              <input className="withdrawal-checkbox" type="checkbox" name="checkbox" id="other" onChange={checkedHandler} 
              value={5}
              />
              <label htmlFor="other">기타</label>
            </div>
          </div>
          {/* textarea 영역 */}
          <div className="withdrawal-textarea-area">
            <textarea 
              id="withdrawalTextarea"
              readOnly
              value={withdrawalText}
              onChange={withdrawalTextKeyupHandler}
              className="withdrawal-textarea" cols={30} rows={10} 
              placeholder="기타 탈퇴 이유를 작성해주시면, 서비스 개선에 많은 도움이 됩니다."
              maxLength={150} 
              style={{border:
                '1px solid' + (withdrawalTextError === true ? '#EA4343' : '#E9E7E2' )
              }}
              ></textarea>
              {/* 작성오류영역 */}
              <div className="withdrawal-error-area" >
                <div style={{flex: 1}}>
                  <p 
                  style={{display:
                    (withdrawalTextError === true ? '' : 'none' )
                  }}
                  className="withdrawal-text-error"
                  >
                    기타 선택시 답변을 입력해주셔야 합니다.</p>
                </div>
                <p>{withdrawalText.length}/150</p>
              </div>
          </div>
          {/* 버튼영역 */}
          <div className="withdrawal-button-area">
            <button 
              disabled={!itemChecked}
              type="button" 
              className="withdrawal-button withdrawal-no" 
              onClick={updateStep}
              >다음</button>
          </div>
        </div>
      </div>
      </>
  )
}
type WITHDRAWAL = {
  step: number
  setStep: Function
}
export default Withdrawal2