import fetch from "utils/fetch";
import { create } from "zustand";
import {testData, testData2} from './testData'

type ANSWER_LIST = {
  qnaList: Array<QNA_ITEM>
  getNewList: Function
  qnaDateList: Array<QNA_DATE_ITEM>
  getQnaDateList: Function
}

type QNA_ITEM = { //qna 객체 1개
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
   * @desc 해당 월의 qna 리스트: 날짜와 카운트 조회
   * @return qnaDateList update
   */
  getQnaDateList: ({email, month}: GET_LIST):void => {
    const param = {
      email: email,
      month: month
    }
    // const result = fetch('/api/getQnaDateList', param)
    const newList:Array<QNA_DATE_ITEM> = testData2
    set({qnaDateList: newList})
  }
}))

type GET_LIST = {
  email: string
  month: string|number
}
export default useAnsweredList
