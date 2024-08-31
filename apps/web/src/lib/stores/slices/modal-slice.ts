import { Store } from "@/lib/stores";
import { StateCreator } from "zustand";

export type ModalState = {
  bookmarkRecipeOpen: boolean;
  createRecipeOpen: boolean;
  searchOpen: boolean;
};

export type ModalActions = {
  setBookmarkRecipeOpen: (open: boolean) => void;
  setCreateRecipeOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

export type ModalSlice = ModalState & ModalActions;

export const initialModalState: ModalState = {
  bookmarkRecipeOpen: false,
  createRecipeOpen: false,
  searchOpen: false,
};

export const createModalSlice: StateCreator<Store, [], [], ModalSlice> = (
  set
) => ({
  ...initialModalState,
  setBookmarkRecipeOpen: (open: boolean) =>
    set(() => ({
      bookmarkRecipeOpen: open,
    })),
  setCreateRecipeOpen: (open: boolean) =>
    set(() => ({
      createRecipeOpen: open,
    })),
  setSearchOpen: (open: boolean) =>
    set(() => ({
      createRecipeOpen: open,
    })),
});
