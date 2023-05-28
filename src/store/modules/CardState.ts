import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

type CARD = {
  todayCardSelectStep: number
  updateCardSelectStep: Function    //사용자의 카드 선택 상태 업데이트
  getCardSelectStep: Function       //카드단계 조회 
  getFourSelectCards: Function      //카드 4개 조회
  fourCards: Array<any>  //조회된카드목록
  todayCardSelectStatus: boolean
  getOneCategory: Function         //카테고리별 1개 조회
  getCards: Function              //카드 4개 조회 (카테고리 조회 -> 카테고리 저장 -> 유저별 카드 조회)
}

const useCardState = create<CARD>((set) => ({
  fourCards: [],
  todayCardSelectStep: 1,         //카드 선택 단계
  todayCardSelectStatus: true,   //카드 선택 가능여부 (3번의 답변이 완료되었을 경우)

  getOneCategory: async (usrNo: string): Promise<void> => {
    console.log('getOneCategory start');
    
    const param = {usrNo: Number(usrNo)}
    //axios 호출
    const response: AxiosResponse = await axios.get(`http://localhost:8080/api/category/select?usrNo=${param.usrNo}`, {withCredentials: false})
    console.log('getOneCategory end');
    
    console.log(response)
  },

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
  getCardSelectStep: async (email: string): Promise<void> => {
    const param = {email: ''}
    param.email = email ? email : ''  //로그인했을 경우 이메일, 아닐경우 빈값 전달
    console.log('getCardSelectStep start')
    const response: AxiosResponse = await axios.get(`http://localhost:8080/api/question/answered/day?writer=${param.email}`, {withCredentials: false})
    console.log('getCardSelectStep start')
    console.log(response)
    console.log('getCardSelectStep end')
    // 단계 상태값 세팅
    set({todayCardSelectStep: ++response.data})
  },

  /*******************************************************
   * @desc 카드 4개 조회
   * @param {string} email
   ******************************************************/ 
  getFourSelectCards: async (email?: string): Promise<void> => {
    const param = {email: ''}
    param.email = email ? email : ''  //로그인했을 경우 이메일, 아닐경우 빈값 전달
    const response: AxiosResponse = await axios.get(`/api/category/select?email=${param.email}`, {withCredentials: false})
    set({fourCards: response.data}) //조회된 카드목록 세팅
  },

  /*******************************************************
   * @desc 카드 4개 조회 (카테고리 조회 -> 카테고리 저장 -> 유저별 카드 조회)
   * @param {string} email
   * @return {Array} fourCards
   *******************************************************/
  getCards: async (email?: string): Promise<void> => {
    console.log('getCards start');

    const param = {email: ''}
    param.email = email ? email : ''   //로그인했을 경우 이메일, 아닐경우 빈값 전달
    let url: string = 'http://localhost:8080'               //axios url 초기화

    if (email) {
      url += `/api/category/select?email=${param.email}`
    } else {
      url += `/api/category/select`
    }
    const response: AxiosResponse = await axios.get(url, {withCredentials: false})
    console.log(response.data);
    console.log('getCards end');
    
    
    set({fourCards: response.data}) //조회된 카드목록 세팅
  }
}));

export default useCardState;