import {create} from 'zustand'

type USER_INFO = {
  usr_no: string
  eml: string
  usr_nm: string
  sns_cls_cd: number | undefined
  sns_token: string | undefined
  gndr_cls_cd: number | null
  brdt: Date | null
  join_dtm: number | null
  last_lgn_dtm: number | undefined
  update_dtm: number | undefined
  whdwl_dtm: number | undefined
}
interface AUTH_STATE {
  userInfo: USER_INFO                                                          //사용자 정보
  isLogin: boolean                                                             //로그인 여부
  updateLoginStatus: (newLoginState: boolean, userInfo: USER_INFO) => void     //로그인 상태 변경
}

const useAuthStore = create<AUTH_STATE>((set) => ({
  userInfo: {
    usr_no: '',
    eml: '',
    usr_nm: '',
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
  updateLoginStatus: (newLoginState: boolean, userInfo: USER_INFO):void => {
    set({isLogin: newLoginState})
    set({userInfo: userInfo})
  }, 
}))

export default useAuthStore