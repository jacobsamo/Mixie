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
  getCollectionsForBookmark: (bookmarkId: string) => Collection[] | null;
  getBookmarksForCollection: (collectionId: string) => Bookmark[] | null;
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

export const createStore = (initState: StoreState = defaultInitState) =>
  createZustandStore<Store>()((set, get) => ({
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

    getCollectionsForBookmark: (bookmarkId: string) => {
      const links = get().bookmark_links;
      const collections = get().collections;
      if (!links || !collections) return null;

      const collectionIds = links
        .filter((link) => link.bookmark_id === bookmarkId)
        .map((link) => link.collection_id);

      // Get the collections that match the collection IDs
      const bookmarkCollections = collections.filter((collection) =>
        collectionIds.includes(collection.collection_id)
      );

      return bookmarkCollections;
    },
    getBookmarksForCollection: (collectionId: string) => {
      const links = get().bookmark_links;
      const bookmarks = get().bookmarks;
      if (!links || !bookmarks) return null;

      const bookmarkIds = links
        .filter((link) => link.collection_id === collectionId)
        .map((link) => link.bookmark_id);

      // Get the bookmarks that match the bookmark IDs
      const collectionBookmarks = bookmarks.filter((bookmark) =>
        bookmarkIds.includes(bookmark.bookmark_id)
      );

      return collectionBookmarks;
    },
  }));
