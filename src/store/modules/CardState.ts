import fetch from "utils/fetch";
import { create } from "zustand";

type CARD = {
  todayCardSelectStep: number
  updateCardSelectStep: Function    //사용자의 카드 선택 상태 업데이트
  getCardSelectStep: Function       //카드단계 조회 - dbconnection
  getFourSelectCards: Function      //카드 4개 조회
  todayCardSelectStatus: boolean
}

const useCardState = create<CARD>((set) => ({
  todayCardSelectStep: 2,         //카드 선택 단계
  todayCardSelectStatus: true,   //카드 선택 가능여부 (3번의 답변이 완료되었을 경우)

  /*******************************************************
   * @desc 사용자의 카드 선택 상태 업데이트
   * @param {number} nextStepNum 다음 step 숫자 
   * @return 
   ******************************************************/
  updateCardSelectStep: (nextStepNum:number): void => {
    const param = {
      todayCardSelectStep: 1,
      todayCardSelectStatus: true
    }
    
    if (nextStepNum > 3) {  //마지막 단계가 업데이트되었을 경우
      param.todayCardSelectStatus = false     
    }
    param.todayCardSelectStep = nextStepNum

    /*****************************************************
     * @desc 사용자 카드선택상태 수정 서비스 호출
     * @method updateUserCardStatus 
     ******************************************************/
    // fetch('/api/updateUserCardStatus', param)

    set({todayCardSelectStep: nextStepNum})   //다음단계 1,2,3,4.. 세팅
    set({todayCardSelectStatus: param.todayCardSelectStatus})       //더이상 선택 못함
  },

  /*******************************************************
   * @desc 카드단계 가져오기 - dbconnection
   * @desc 해당 함수를 호출하여 단계, 상태값 세팅 처리
   * @content [todayCardSelectStep, todayCardSelectStatus]: 단계, 상태
   ******************************************************/
  getCardSelectStep: (email: string): void => {
    const param = {email}
    // const result = fetch('/api/getCardSelectStatus', param)
    // set({todayCardSelectStep: result.data.cardStep})
    // set({todayCardSelectStatus: result.data.selectionAvaiable}) //결과값세팅

  },

  /*******************************************************
   * @desc 카드 4개 조회
   * @param {string} email
   ******************************************************/ 
  getFourSelectCards: (email?: string): void => {
    const param = {
      email: ''
    }
    if (email) {  //로그인했을경우
      param.email = email
    }
    //const result = fetch('/api/getFourSelectCards', param)
  },

}));

export default useCardState;