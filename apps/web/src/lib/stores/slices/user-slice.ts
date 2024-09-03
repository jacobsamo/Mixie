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
  isLoggedIn: boolean;
};

export type UserActions = {
  setBookmarks: (bookmarks: Bookmark[] | null) => void;
  setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) => void;
  removeBookmarkLinks: (bookmarkLinkId: string | string[]) => void;
  setCollections: (collections: Collection[] | null) => void;
  getCollectionsForBookmark: (bookmarkId: string | null) => Collection[] | null;
  getBookmarksForCollection: (collectionId: string) => Bookmark[] | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export type UserSlice = UserState & UserActions;

export const initialUserState: UserState = {
  bookmarks: null,
  collections: null,
  bookmark_links: null,
  isLoggedIn: false,
};

export const createUserSlice: StateCreator<Store, [], [], UserSlice> = (
  set,
  get
) => ({
  ...initialUserState,
  setIsLoggedIn: (isLoggedIn: boolean) =>
    set(() => ({
      isLoggedIn,
    })),
  setBookmarks: (bookmarks: Bookmark[] | null) => {
    if (!bookmarks) return;

    return set(({ bookmarks: prevBookmarks }) => {
      const prevBookmarksMap = prevBookmarks
        ? new Map(
            prevBookmarks.map((bookmark) => [bookmark.bookmark_id, bookmark])
          )
        : new Map();

      bookmarks.forEach((bookmark) => {
        prevBookmarksMap.set(bookmark.bookmark_id, {
          ...prevBookmarksMap.get(bookmark.bookmark_id),
          ...bookmark,
        });
      });

      const updatedBookmarks = Array.from(prevBookmarksMap.values());

      return { bookmarks: updatedBookmarks };
    });
  },
  setBookmarkLinks: (bookmark_links: Tables<"bookmark_link">[] | null) => {
    if (!bookmark_links) return;

    return set(({ bookmark_links: prevLinks }) => {
      const prevLinksMap = prevLinks
        ? new Map(prevLinks.map((link) => [link.link_id, link]))
        : new Map();

      bookmark_links.forEach((link) => {
        prevLinksMap.set(link.link_id, {
          ...prevLinksMap.get(link.link_id),
          ...link,
        });
      });

      const updatedLinks = Array.from(prevLinksMap.values());

      return { bookmark_links: updatedLinks };
    });
  },
  removeBookmarkLinks: (bookmarkIdsToRemove: string | string[]) => {
    return set(({ bookmark_links: prevLinks }) => {
      let newLinks = prevLinks ? [...prevLinks] : [];

      if (Array.isArray(bookmarkIdsToRemove)) {
        newLinks = newLinks.filter(
          (link) => !bookmarkIdsToRemove.includes(link.collection_id)
        );
      } else {
        newLinks = newLinks.filter(
          (link) => link.collection_id !== bookmarkIdsToRemove
        );
      }

      console.log("newLinks-remove: ", {
        bookmarkIdsToRemove: bookmarkIdsToRemove,
        newLinks: newLinks,
      });
      return { bookmark_links: newLinks };
    });
  },
  setCollections: (collections: Collection[] | null) => {
    if (!collections) return;

    return set(({ collections: prevCollections }) => {
      const prevCollectionsMap = prevCollections
        ? new Map(
            prevCollections.map((collection) => [
              collection.collection_id,
              collection,
            ])
          )
        : new Map();

      collections.forEach((collection) => {
        prevCollectionsMap.set(collection.collection_id, {
          ...prevCollectionsMap.get(collection.collection_id),
          ...collection,
        });
      });

      const updatedCollections = Array.from(prevCollectionsMap.values());

      return { collections: updatedCollections };
    });
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
