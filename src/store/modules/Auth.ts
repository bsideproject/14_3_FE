import { TYPE_USER_INFO } from "types/authTypes";
import fetch from "utils/fetch";
import { create } from "zustand";


interface AUTH_STATE {
  userInfo: TYPE_USER_INFO; //사용자 정보
  isLogin: boolean; //로그인 여부
  isInfoChange: boolean; //개인정보 변경 여부
  updateLoginStatus: (newLoginState: boolean, userInfo: TYPE_USER_INFO) => void; //로그인 상태 변경
  updateInfoChangeStatus: (newInfoChange: boolean) => void; // 회원정보 변경 여부
  withdrawalUser: (email:string) => boolean   //회원탈퇴로직
}

const useAuthStore = create<AUTH_STATE>((set) => ({
  userInfo: {
    usr_no: "",
    eml: "",
    usr_nm: "",
    sns_cls_cd: undefined,
    sns_token: undefined,
    gndr_cls_cd: null,
    brdt: null,
    join_dtm: null,
    last_lgn_dtm: undefined,
    update_dtm: undefined,
    whdwl_dtm: undefined,
  },
  isLogin: false,
  isInfoChange: false,
  updateLoginStatus: (newLoginState: boolean, userInfo: TYPE_USER_INFO): void => {
    set({ isLogin: newLoginState });
    set({ userInfo: userInfo });
  },
  updateInfoChangeStatus: (newInfoChange: boolean): void => {
    set({ isInfoChange: newInfoChange });
  },

  /**
   * @desc 회원탈퇴
   * @param email 
   * @returns {boolean}
   */
  withdrawalUser: (email: string): boolean => {
    const param = {eml: email}
    //const result = fetch('/api/widthdrawalUser', param)   //db
    set({ isLogin: false })               //islogin
    set({ userInfo: initialUserState })   //reset
    return true
  }
}));

const initialUserState = {
  usr_no: "",
  eml: "",
  usr_nm: "",
  sns_cls_cd: undefined,
  sns_token: undefined,
  gndr_cls_cd: null,
  brdt: null,
  join_dtm: null,
  last_lgn_dtm: undefined,
  update_dtm: undefined,
  whdwl_dtm: undefined,
}

export default useAuthStore;
