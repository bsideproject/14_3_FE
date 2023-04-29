//사용자 정보 타입 
export interface TYPE_USER_INFO {
  usr_no: string;
  eml: string;
  usr_nm: string;
  sns_cls_cd: number | undefined;
  sns_token: string | undefined;
  gndr_cls_cd: number | null;
  brdt: Date | null;
  join_dtm: number | null;
  last_lgn_dtm: number | undefined;
  update_dtm: number | undefined;
  whdwl_dtm: number | undefined;
};
