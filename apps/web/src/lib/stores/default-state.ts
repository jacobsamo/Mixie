import { type ModalState, initialModalState } from "./slices/modal-slice";
import { type UserState, initialUserState } from "./slices/user-slice";

export type StoreState = UserState & ModalState;

export const defaultState: StoreState = {
  ...initialUserState,
  ...initialModalState,
};
