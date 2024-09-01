import { StateCreator } from "zustand";
import { Bookmark, Collection } from "@/types";
import { Tables } from "@mixie/supabase/types";
import { Store } from "@/lib/stores";
import {
  getBookmarksForCollection,
  getCollectionsForBookmark,
} from "@/lib/utils/bookmarks";

export type UserState = {
  bookmarks: Bookmark[] | null;
  collections: Collection[] | null;
  bookmark_links: Tables<"bookmark_link">[] | null;
};

export type UserActions = {
  setBookmarks: (bookmarks: Bookmark[] | null) => void;
  setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) => void;
  setCollections: (collections: Collection[] | null) => void;
  getCollectionsForBookmark: (bookmarkId: string | null) => Collection[] | null;
  getBookmarksForCollection: (collectionId: string) => Bookmark[] | null;
};

export type UserSlice = UserState & UserActions;

export const initialUserState: UserState = {
  bookmarks: null,
  collections: null,
  bookmark_links: null,
};

export const createUserSlice: StateCreator<Store, [], [], UserSlice> = (
  set,
  get
) => ({
  ...initialUserState,
  setBookmarks: (bookmarks: Bookmark[] | null) => {
    if (!bookmarks) return;

    return set(({ bookmarks: prevBookmarks }) => ({
      bookmarks: prevBookmarks ? [...prevBookmarks, ...bookmarks] : bookmarks,
    }));
  },
  setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) => {
    if (!bookmark_links) return;

    return set(({ bookmark_links: prevLinks }) => ({
      bookmark_links: prevLinks
        ? [...prevLinks, ...bookmark_links]
        : bookmark_links,
    }));
  },
  setCollections: (collections: Collection[] | null) => {
    if (!collections) return;

    return set(({ collections: prevCollections }) => ({
      collections: prevCollections
        ? [...prevCollections, ...collections]
        : collections,
    }));
  },
  getCollectionsForBookmark: (bookmarkId: string | null) => {
    const links = get().bookmark_links;
    const collections = get().collections;

    if (!bookmarkId) return null;

    return getCollectionsForBookmark(bookmarkId, links, collections);
  },
  getBookmarksForCollection: (collectionId: string) => {
    const links = get().bookmark_links;
    const bookmarks = get().bookmarks;

    return getBookmarksForCollection(collectionId, links, bookmarks);
  },
});
