import {useState} from 'react'
import Header from 'components/auth/Header'
import { motion } from "framer-motion";
import Withdrawal1 from 'components/mypage/Withdrawal1';
import Withdrawal2 from 'components/mypage/Withdrawal2';

/**
 * @설명 회원탈퇴 첫번째 페이지
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 */
const WithdrawalMain = () => {
  const [step, setStep] = useState(1) //컴포넌트 단계 제어
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
          : (step === 2 ? (<Withdrawal2 step={step} setStep={setStep}/>) : '' )
      }
      </motion.div>
      
      
    </>
  ) 
}

export default WithdrawalMain