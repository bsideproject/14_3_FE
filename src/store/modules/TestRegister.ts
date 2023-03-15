import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

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
type PillListState = {
  registerInfo: Array<REGISTER_INFO>;
  insertId: (registerInfo: REGISTER_INFO) => void;
};

type pillListPersist = (
  config: StateCreator<PillListState>,
  options: PersistOptions<PillListState>
) => StateCreator<PillListState>;

const testRegisterStore = create<TEST_STATE>(
  (persist as pillListPersist)(
    (set) => ({
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
        set((state) => ({
          registerInfo: state.registerInfo.concat(registerInfo),
        })),
    }),
    {
      name: "testRegister",
    }
  )
);

export default testRegisterStore;
