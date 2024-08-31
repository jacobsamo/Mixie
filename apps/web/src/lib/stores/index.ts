import { createStore as createZustandStore } from "zustand/vanilla";
import { defaultState, type StoreState } from "./default-state";
import { createUserSlice, UserSlice } from "./slices/user-slice";
import { createModalSlice, ModalSlice } from "./slices/modal-slice";

export type Store = UserSlice & ModalSlice;

export const initStore = (): StoreState => {
  return defaultState;
};

export const createStore = (initState: StoreState = defaultState) =>
  createZustandStore<Store>()((...actions) => ({
    ...initState,
    ...createUserSlice(...actions),
    ...createModalSlice(...actions),
  }));
