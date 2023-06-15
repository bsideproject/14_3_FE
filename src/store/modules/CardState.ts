import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import {DinnerImg,
  FlowerImg,
  LampImg,
  BookImg,
  ExcerciseImg,
  ShowerImg,
  SelectedBook,
  SelectedDinner,
  SelectedExcercise,
  SelectedFlower,
  SelectedLamp,
  SelectedShower
} from 'components/main/CardsImages'

type CARD_STORE = {
  oneCard: Array<any>               //조회된카드
  todayCardSelectStep: number
  updateCardSelectStep: Function    //사용자의 카드 선택 상태 업데이트
  getCardSelectStep: Function       //카드단계 조회 
  fourCards: Array<any>  //조회된카드목록]
  resetFourCards: Function          //카드목록 초기화
  todayCardSelectStatus: boolean 
  getCards: Function              //카드 4개 조회 (카테고리 조회 -> 카테고리 저장 -> 유저별 카드 조회)
  saveSelection: Function         //카드 1개 선택 저장
  saveOneCard: Function           //선택한 카드 정보 저장
  answerQuestion: Function        //답변 저장

}

const useCardState = create<CARD_STORE>((set) => ({
  oneCard: [],
  fourCards: [],
  todayCardSelectStep: 1,        //카드 선택 단계
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

    /*****************************************************
     * @desc 사용자 카드선택상태 수정 서비스 호출
     * @method updateUserCardStatus 
     ******************************************************/
    // fetch('/api/updateUserCardStatus', param)

    set({todayCardSelectStep: nextStepNum})   //다음단계 1,2,3,4.. 세팅
    set({todayCardSelectStatus: param.todayCardSelectStatus})       //더이상 선택 못함
  },

  /*******************************************************
   * @desc 금일 남은 답변 횟수 조회, 상태값 세팅 처리
   * @content [todayCardSelectStep, todayCardSelectStatus]: 단계, 상태
   ******************************************************/
  getCardSelectStep: async (email: string): Promise<void> => {
    const param = {email: ''}
    param.email = email ? email : ''  //로그인했을 경우 이메일, 아닐경우 빈값 전달
    const response: AxiosResponse = await axios.get(`http://localhost:8080/api/question/answered/day?writer=${param.email}`, {withCredentials: false})
    set({todayCardSelectStep: ++response.data}) // 단계 상태값 세팅
  },

  /*******************************************************
   * @desc 카드 4개 조회 (카테고리 조회 -> 카테고리 저장 -> 유저별 카드 조회)
   * @param {string} email
   * @return {Array} fourCards
   *******************************************************/
  getCards: async (email?: string): Promise<void> => {
    const param = {email: ''}
    param.email = email ? email : ''   //로그인했을 경우 이메일, 아닐경우 빈값 전달
    let url: string = 'http://localhost:8080'               //axios url 초기화

    if (email) {
      url += `/api/category/select?email=${param.email}`
    } else {
      url += `/api/category/select`
    }
    const response: AxiosResponse = await axios.get(url, {withCredentials: false})
    console.log(response)
    let cards:Array<any> = []  //조회된 카드목록
    let card:Array<any> = []  //조회된 카드목록

    //카드 조회 결과가 "오늘의 카테고리 선택을 모두 진행하였습니다." 일 경우 
    if (response.data === "오늘의 카테고리 선택을 모두 진행하였습니다. ") {
      set({todayCardSelectStatus: false})  //더이상 선택 못함
      return
    }
    
    if (typeof response.data === 'object') {
      if (response.data.length > 2) {
        cards = response.data   //조회된 카드목록(4개)
        card = []
      } else {
        cards = []
        card = response.data   //조회된 카드(1개) 
      }
    } else {
      console.log('asdsad')
      card = []
      cards = []
      set({todayCardSelectStatus: false})  //더이상 선택 못함
    }

    if (cards.length > 3) {
      //카드 순서에 따라 랜덤으로 이미지값 추가 세팅
      cards[0].img = BookImg
      cards[0].aftrImg = SelectedBook
      cards[1].img = DinnerImg
      cards[1].aftrImg = SelectedDinner
      cards[2].img = LampImg
      cards[2].aftrImg = SelectedLamp
      cards[3].img = FlowerImg
      cards[3].aftrImg = SelectedFlower
    } 

    set({oneCard: card})      //조회된 카드 세팅
    set({fourCards: cards})   //조회된 카드목록 세팅
  },

  /**
   * @desc 카드 4개 초기화
   */
  resetFourCards: (): void => {
    set({fourCards: []})
  },

  /**
   * @desc 카드 1개 선택 저장
   */
  saveSelection: async (aWriter: string, qNo: string): Promise<void> => {
    const param = {
      aWriter: '',
      qNo: 0
    }
    param["aWriter"] = aWriter
    param["qNo"] = parseInt(qNo)
    await axios.post('http://localhost:8080/api/answers/selectedQuestion', param, {withCredentials: false})
  },

  /**
   * @desc 선택한 카드 정보 저장
   */
  saveOneCard: (card: any): void => {
    set({oneCard: [card]})
  },

  /**
   * @desc 답변 저장
   */
  answerQuestion: async (answer: ANSWER_CONTENT): Promise<void> => {
    const param = {
      aWriter: '',
      qNo: 0,
      aAnswerContent: '',
      category: ''
    }
    param["aWriter"] = answer.aWriter
    param["qNo"] = answer.qNo
    param["aAnswerContent"] = answer.aAnswerContent
    param["category"] = answer.category
    
    await axios.post('http://localhost:8080/api/answers/saveAnswer', param, {withCredentials: false})

    set({fourCards: []})  //카드목록 초기화
    set({oneCard: []})    //선택한 카드 초기화
  },


}));
type ANSWER_CONTENT = {
  qNo: number
  aWriter: string
  aAnswerContent: string
  category: string
}
export default useCardState;