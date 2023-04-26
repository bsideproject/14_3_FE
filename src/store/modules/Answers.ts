import fetch from "utils/fetch";
import { create } from "zustand";

type ANSWER_LIST = {
  qnaList: Array<QNA_ITEM>
  getNewList: Function
}

type QNA_ITEM = { //qna 객체 1개
  index?: number  //답변의 index
  q?: string  //question
  qc?: string //category
  a?: string //answer
}

//임시데이터
const testData = [
  {
    date: "2023-04-11",
    qc: 'exploration',   //나의탐구
    q: '질문입니다?질문입니다?질문입니다?질문입니다?질문입니다?',
    a: '답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?답변입니다?'
  },
  {
    date: "2023-04-17",
    qc: 'daily',          //나의일상
    q: '질문입니다?',
    a: '답변입니다?'
  },
  {
    date: "2023-04-09",
    qc: 'preferences',   //나의취향
    q: '질문입니다?',
    a: '답변입니다?'
  },
  {
    date: "2023-04-18",
    qc: 'memory',         //나의기억
    q: '질문입니다?',
    a: '답변입니다?'
  },
  {
    date: "2023-04-20",
    qc: 'wish',           //나의꿈
    q: '질문입니다?',
    a: '답변입니다?'
  },
  
]

/**
 * @desc Main - QNA List 상태관리
 */
const useAnsweredList = create<ANSWER_LIST>((set) => ({
  qnaList: [...testData],

  /**
   * @desc 해당 월의 qna 리스트 조회
   * @return qnaList update
   */
  getNewList: ({email, month}: GET_NEW_LIST) => {
    const param = {
      email: email,
      month: month
    }
    // const result = fetch('/api/getQnaList', param)
    // const newList = result?.data.list
    const newList:Array<QNA_ITEM> = testData
    set({qnaList: newList})                             //새로운 목록 입력
  },
}))

type GET_NEW_LIST = {
  email: string
  month: string|number
}
export default useAnsweredList
