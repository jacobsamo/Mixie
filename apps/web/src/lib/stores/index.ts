import { Bookmark, Collection } from "@/types";
import { Tables } from "@mixie/supabase/types";
import { createStore as createZustandStore } from "zustand/vanilla";

interface UserSlice {
  bookmarks: Bookmark[] | null;
  collections: Collection[] | null;
  bookmark_links: Tables<"bookmark_link">[] | null;
  setBookmarks: (bookmarks: Bookmark[] | null) => void;
  setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) => void;
  setCollections: (collections: Collection[] | null) => void;
}

export type Store = UserSlice;
export type StoreState = Pick<
  Store,
  "bookmarks" | "collections" | "bookmark_links"
>;

export const defaultInitState: StoreState = {
  bookmarks: null,
  collections: null,
  bookmark_links: null,
};

export const createStore = (initState: StoreState = defaultInitState) => {
  return createZustandStore<Store>()((set) => ({
    ...initState,
    setBookmarks: (bookmarks: Bookmark[] | null) =>
      set(() => ({
        bookmarks,
      })),
    setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) =>
      set(() => ({
        bookmark_links,
      })),
    setCollections: (collections: Collection[] | null) =>
      set(() => ({
        collections,
      })),
  }));
};
