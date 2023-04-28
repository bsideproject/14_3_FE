import fetch from "utils/fetch";
import { create } from "zustand";
import {testData, testData2} from './testData'

type ANSWER_LIST = {
  qnaList: Array<QNA_ITEM>
  getNewList: Function
  qnaDateList: Array<QNA_DATE_ITEM>
  getQnaDateList: Function
  isThisMonth: boolean                //MyCalendar 기준, 페이지의 당월 상태 유무
  updateIsThisMonth: Function         //페이지의 당월 상태변경함수
  getOneDayQnaDateList: Function      //선택일 date,count조회
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
  qnaList: [...testData],
  qnaDateList: [...testData2],
  isThisMonth: true,

  /**
   * @desc 해당 월의 qna 리스트 조회
   * @return qnaList update
   */
  getNewList: ({email, month}: GET_LIST) => {
    const param = {
      email: email,
      month: month
    }
    // const result = fetch('/api/getQnaList', param)
    // const newList = result?.data.list
    const newList:Array<QNA_ITEM> = testData
    set({qnaList: newList})                             //새로운 목록 입력
  },

  /**
   * @desc 해당 [월]의 qna 리스트 조회
   * @return update
   */
  getQnaDateList: ({email, month}: GET_LIST):void => {
    const param = {
      email: email,
      month: month
    }
    // const result = fetch('/api/getQnaDateList', param)
    const newList1:Array<QNA_ITEM> = testData
    const newList2:Array<QNA_DATE_ITEM> = testData2
    set({qnaList: newList1})                        //리스트출력
    set({qnaDateList: newList2})                    //date내용출력
  },

  /**
   * @desc 해당 [일]의 qna 리스트 조회
   * @return update
   */
  getOneDayQnaDateList: ({email, date}: GET_LIST):void => {
    const param = {
      email: email,
      date: date
    }
    // const result = fetch('/api/getOneDayQnaDateList', param)
    const newList1:Array<QNA_ITEM> = testData
    const newList2:Array<QNA_DATE_ITEM> = testData2
    set({qnaList: newList1})                        //리스트출력
    set({qnaDateList: newList2})                    //date내용출력
  },

  /**
   * @desc 당월 view update 
   * @param {boolean} newState
   */
  updateIsThisMonth: (newState: boolean):void => {
    set({isThisMonth: newState})
  },

}))

type GET_LIST = {
  email: string
  month?: string|number
  date?: Date
}
export default useAnsweredList
