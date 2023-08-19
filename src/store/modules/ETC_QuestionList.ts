import {create, StateCreator} from 'zustand'
import { persist, PersistOptions } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";
import CL from "composables/COMMON/common";


const useETCQuestionStore = create<ETC_QS>((set) => ({
  etcQuestionList: Array<ETC_QS_TYPE>() || [], //원본데이터
  sortedQuestionList: Array<ETC_QS_TYPE>() || [], //sort 등이 적용된 데이터

  getETCQuestionList: async (param: SEARCH) => {
    const res: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/question/questions?page=${param.page}&size=${param.size}`)
    const setList = res ? res.data ? res.data.content : [] : []
    set({etcQuestionList: setList, sortedQuestionList: setList})
  },

  getSortedQuestionList: (param: string) => {
    const sortedList = [...useETCQuestionStore.getState().etcQuestionList]
    
    if(param !== "") { //검색어 입력 이벤트
      const newSortedList = sortedList.filter((item) => {
        if (item.qquestion.toLowerCase().includes(param.toLowerCase()) || item.qwriter.toLowerCase().includes(param.toLowerCase())) {
          return item
        }
      })
      set({sortedQuestionList: newSortedList})
    } else {
      set({sortedQuestionList: sortedList})
    }
  }
}));



type ETC_QS = {
  etcQuestionList: Array<ETC_QS_TYPE>;
  sortedQuestionList: Array<ETC_QS_TYPE>;
  getETCQuestionList: (param: SEARCH) => Promise<void>;
  getSortedQuestionList: (param: string) => void;
}

type ETC_QS_TYPE = {
  qno: number;
  qquestion: string;
  qcategory: string;
  qwriter: string;
  qcreatedAt: string;
}

export type SEARCH = {
  page: number;
  size: number;
}

export default useETCQuestionStore;


