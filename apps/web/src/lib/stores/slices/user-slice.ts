import { StateCreator } from "zustand";
import { Bookmark, Collection } from "@/types";
import { Tables } from "@mixie/supabase/types";
import { Store } from "@/lib/stores";

export type UserState = {
  bookmarks: Bookmark[] | null;
  collections: Collection[] | null;
  bookmark_links: Tables<"bookmark_link">[] | null;
};

export type UserActions = {
  setBookmarks: (bookmarks: Bookmark[] | null) => void;
  setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) => void;
  setCollections: (collections: Collection[] | null) => void;
  getCollectionsForBookmark: (bookmarkId: string) => Collection[] | null;
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
});
