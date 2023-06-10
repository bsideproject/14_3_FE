import { create } from "zustand";
import {testData, testData2} from './testData'
import axios from "axios";

type ANSWER_LIST = {
  answeredList: Array<any>    //답변목록
  getAnsweredList: Function   //답변목록 조회

  answeredCount: Number       //답변한 개수
  getAnsweredCount: Function  //답변한 개수 조회
  
  isThisMonth: boolean                //MyCalendar 기준, 페이지의 당월 상태 유무
  updateIsThisMonth: Function         //페이지의 당월 상태변경함수
  
  selectedMonth: string               //현재선택되어진 월
  setSelectedMonth: Function          //현재선택되어진 월 set
  selectedDate: string                //선택한 날짜
  setSelectDate: Function             //선택한 날짜 저장
}

type QNA_ITEM = { //qna 리스트 목록 객체
  index?: number  //답변의 index
  date?: string
  q?: string  //question
  qc?: string //category
  a?: string //answer
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
  isThisMonth: true,
  selectedDate: '',              //선택한 날짜
  selectedMonth: (new Date().getMonth() + 1).toString(),

  /**
   * @desc 해당 월의 qna 리스트 조회
   * @return answeredList update
   */
  getAnsweredList: async (param: any) => {
    console.log('getAnsweredList', param);
    const result = await axios.get(`http://localhost:8080/api/question/answered/${param.email}/${param.date}`)
    console.log('getAnsweredList', result);
    const newList = result?.data?.list ? result?.data?.list : []    //값이 없을 경우 빈 배열로 초기화
    set({answeredList: newList})  
  },

  /**
   * @desc 해당 월에 답변한 개수 조회
   * @param 
   */
  getAnsweredCount: async (param: any) => {
    const result = await axios.get(`http://localhost:8080/api/question/answeredCount/${param.date[0]}/${param.date[1]}/${param.email}`)
    const count = result?.data.count
    set({answeredCount: count})
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
  }
}))

type GET_LIST = {
  email: string
  month?: string|number
  date?: Date
}
export default useAnsweredList
