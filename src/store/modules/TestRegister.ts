import { create } from "zustand";

type REGISTER_INFO = {
  email: string;
  nickName: string;
  password: string;
  gender: boolean;
  birthDt: string;
};
type TEST_STATE = {
  registerInfo: Array<REGISTER_INFO>;
  insertId: (registerInfo: REGISTER_INFO) => void;
};
const testRegisterStore = create<TEST_STATE>((set) => ({
  registerInfo: [
    {
      email: "test@gmail.com",
      nickName: "테스터",
      password: "12341234",
      gender: true,
      birthDt: "2000-02-02",
    },
  ],
  insertId: (registerInfo: REGISTER_INFO): void =>
    set((state) => ({ registerInfo: state.registerInfo.concat(registerInfo) })),
}));

export default testRegisterStore;
