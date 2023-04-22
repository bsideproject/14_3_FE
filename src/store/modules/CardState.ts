import fetch from "utils/fetch";
import { create } from "zustand";


const useCardState = create<CARD>((set) => ({
  /**
   * @desc 카드 선택 단계
   */
  todayCardSelectStep: 4,
  /**
   * @desc 카드 선택 가능여부 (3번의 답변이 완료되었을 경우)
   */
  todayCardSelectStatus: false,

  /**
   * @desc 카드단계 업데이트
   * @param {number} nextStepNum 다음 step 숫자 
   * @return 
   */
  updateCardSelectStep: (nextStepNum:number ): void => {
    //db connection
    set({todayCardSelectStep: nextStepNum})
  },
  /**
   * @desc 카드단계 가져오기 - dbconnection
   * @desc 그냥 가져오기는 zustand 불러오기로 사용
   * @return 
   */
  getCardSelectStep: (email: string): void => {
    const param = {email}
    // const result = fetch('/api/getCardSelectStep', param)
    // set({todayCardSelectStep: result.data.cardStep})
  },
  /**
    * @desc 카드 4개 조회 - dbconnection
    */ 
  getFourSelectCards: (email?: string): void => {
    if (email) {  //로그인
      
    } else {  //비로그인

    }
  }

}));

type CARD = {
  todayCardSelectStep: number
  updateCardSelectStep: Function
  getCardSelectStep: Function
  getFourSelectCards: Function
}

export default useCardState;