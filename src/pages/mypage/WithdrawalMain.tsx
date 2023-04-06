import {useState} from 'react'
import Header from 'components/auth/Header'
import { motion } from "framer-motion";
import Withdrawal1 from 'components/mypage/Withdrawal1';
import Withdrawal2 from 'components/mypage/Withdrawal2';
import Withdrawal3 from 'components/mypage/Withdrawal3';
import ConfirmPopup from 'components/ConfirmPopup';
import AlertTextPopup from 'components/AlertTextPopup';
import { useNavigate } from 'react-router-dom';

/**
 * @설명 회원탈퇴 첫번째 페이지
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @TODO motion 적용, BE연결
 */
const WithdrawalMain = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) //컴포넌트 단계 제어
  const [withdrawalCompleted, setWithdrawalCompleted] = useState<boolean>(false)
  const withdrawalAction = () => { //탈퇴버튼을 최종적으로 눌렀을 경우
    //axios 회원 탈퇴 로직
    //1. auth : email (id) 가져오기
    //2. 저장한 정보(설문) 가져오기
    //3. 값 합쳐서 BE로 전송
    //4. 끝나고 팝업으로 탈퇴가 완료되었음 전달
    setStep(5)
    console.log('탈퇴누름')
    setWithdrawalCompleted(true)
  }

  //탈퇴 완료 시 이동할 페이지 : 로그인
  const moveToMain = () => {
    console.log('go to main')
    navigate('/login', {replace: true}) //navigate 초기화
  }

  return (
    <>
      <Header title="회원 탈퇴" />
      <motion.div
          // key={step}
					// src={imgList[page]}
					// initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
					// animate={{ opacity: 1,  x: 0 }}
					// exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
      >

      {
        step === 1 ? (<Withdrawal1 step={step} setStep={setStep}/>)
          : (step === 2 ? (<Withdrawal2 step={step} setStep={setStep}/>) : (<Withdrawal3 step={step} setStep={setStep}/>)
          ) 
      }
      
      </motion.div>

      { //step === 4 일시 탈퇴하기 알림 팝업
        step === 4 ? (
        <ConfirmPopup text="고밍을 탈퇴하시겠습니까?" step={step} callbackFunction={withdrawalAction} />
        ) : ''
      }
      { //회원 탈퇴 완료시
        withdrawalCompleted === true ? (
        <AlertTextPopup text='고밍의 탈퇴가 완료되었습니다.' text2="감사합니다!" callbackFunction={moveToMain} />
        ) : ''
      }
    </>
  ) 
}

export default WithdrawalMain