import { Bookmark, Collection } from "@/types";
import { createStore as createZustandStore } from "zustand/vanilla";

export type StoreState = {
  bookmarks: Bookmark[] | null;
  collections: Collection[] | null;
};

export type StoreActions = {
  setBookmarks: (bookmarks: Bookmark[] | null) => void;
  setCollections: (collections: Collection[] | null) => void;
};

export type Store = StoreState & StoreActions;

export const defaultInitState: StoreState = {
  bookmarks: null,
  collections: null,
};

export const createStore = (
  initState: StoreState = defaultInitState
) => {
  return createZustandStore<StoreState>()((set) => ({
    ...initState,
    setBookmarks: (bookmarks: Bookmark[] | null) =>
      set(() => ({
        bookmarks,
      })),
    setCollections: (collections: Collection[] | null) =>
      set(() => ({
        collections,
      })),
  }));
};
