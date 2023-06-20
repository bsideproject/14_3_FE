import { create } from "zustand";
import {testData, testData2} from './testData'
import axios from "axios";

type ANSWER_LIST = {
  answeredList: Array<any>    //답변목록
  getAnsweredList: Function   //답변목록 조회
  initAnsweredList: Function  //답변목록 초기화
  
  answeredDateCount: Array<any>   //월 혹은 일별 답변 개수
  getAnsweredDateCount: Function  //해당 date의 qna count 조회
  initAnsweredDateCount: Function //해당 날짜의 답변목록개수 목록 초기화

  answeredCount: Number       //답변한 개수
  getAnsweredCount: Function  //답변한 개수 조회
  initAnsweredCount: Function  //답변 개수 초기화

  answeredView: ANSWER          //답변상세 내용 1개
  updateAnsweredView: Function  //답변상세 내용 저장 혹은 삭제
  
  isThisMonth: boolean                //MyCalendar 기준, 페이지의 당월 상태 유무
  updateIsThisMonth: Function         //페이지의 당월 상태변경함수
  
  selectedMonth: string               //현재선택되어진 월
  setSelectedMonth: Function          //현재선택되어진 월 set
  selectedDate: string                //선택한 날짜
  setSelectDate: Function             //선택한 날짜 저장
}

type ANSWER = { //qna 리스트 목록 객체
  date: string
  category: string
  question: string
  answer: string
}

type QNA_DATE_ITEM = { //qna 객체 1개
  date: string
  count: number
}

/**
 * @desc Main - QNA List 상태관리
 */
const useAnsweredList = create<ANSWER_LIST>((set) => ({
  answeredList: [],
  answeredCount: 0,
  answeredDateCount: [],
  answeredView: {date: '',question: '',category: '',answer: ''},
  isThisMonth: true,
  selectedDate: '',              //선택한 날짜
  selectedMonth: (new Date().getMonth() + 1).toString(),

  /**
   * @desc 해당 월의 qna 리스트 조회
   * @return answeredList update
   */
  getAnsweredList: async (param: any) => {
    const result = await axios.get(`http://localhost:8080/api/question/answered/${param.email}/${param.date}`)
    const newList = result?.data ? result?.data : []    //값이 없을 경우 빈 배열로 초기화
    console.log('getAnsweredList', newList);
    
    set({answeredList: newList})
  },

  /**
   * @desc 해당 date의 qna count 조회
   */
  getAnsweredDateCount: async (param: any) => {
    const result = await axios.get(`http://localhost:8080/api/question/answeredCountDatesInMonth/${param.email}/${param.date}`)
    set({answeredDateCount: result?.data})
  },

  
  /**
   * @desc 해당 날짜의 답변목록개수 목록 초기화
   */
  initAnsweredDateCount: ():void => {
    set({answeredDateCount: []})
  },

  /**
   * @desc 해당 월의 qna 리스트 초기화
   */
  initAnsweredList: ():void => {
    set({answeredList: []})
  },

  /**
   * @desc 해당 월에 답변한 개수 조회
   * @param 
   */
  getAnsweredCount: async (param: any) => {
    const result = await axios.get(`http://localhost:8080/api/question/answeredCount/${param.email}/${param.date[0]}/${param.date[1]}`)
    const count = result?.data.count
    set({answeredCount: count})
  },

  /**
   * @desc 해당 date의 답변 개수 초기화
   */
  initAnsweredCount: ():void => {
    set({answeredCount: 0})
  },
  
  /**
   * @desc 당월 view update 
   */
  updateIsThisMonth: (newState: boolean):void => {
    set({isThisMonth: newState})
  },

  /**
   * @desc 현재 선택된 월 set 함수
   */
  setSelectedMonth: (newState:number):void => {
    set({selectedMonth: newState.toString()})
  },

  
  /**
   * @desc selectedDate 상태값 세팅
  */
  setSelectDate: (date: string): void => {
    set({selectedDate: date})
  },

  /**
   * @desc 답변상세 내용 저장 혹은 삭제
   */
  updateAnsweredView: (newState: any): void => {
    newState === null ? set({answeredView: {date: '',question: '',category: '',answer: ''}}) : set({answeredView: newState})
  }

}))

type GET_LIST = {
  email: string
  month?: string|number
  date?: Date
}
export default useAnsweredList
