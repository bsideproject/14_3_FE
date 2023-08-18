import {create, StateCreator} from 'zustand'
import { persist, PersistOptions } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";
import CL from "composables/COMMON/common";


const useETCQuestionStore = create<ETC_QS>(() => ({
  etcQuestionList: [],

  getETCQuestionList: async (param: SEARCH) => {
    CL.DS("getETCQuestionList")
    const res: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/question/getETCQuestionList`, param)
    

    CL.DE("getETCQuestionList")
  }

  
}));



type ETC_QS = {
  etcQuestionList: Array<ETC_QS_TYPE>;
  getETCQuestionList: (param: SEARCH) => Promise<void>;
}

type ETC_QS_TYPE = {
  q_no: number;
  q_question: string;
  q_category: string;
  q_writer: string;
  q_created_at: string;
}

export type SEARCH = {
  pageNo: number;
  pageSize: number;
}

export default useETCQuestionStore;


