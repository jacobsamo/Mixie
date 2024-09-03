import { Bookmark, Collection } from "@/types";
import { Tables } from "@mixie/supabase/types";

export const getCollectionsForBookmark = (
  bookmarkId: string,
  links: Tables<"bookmark_link">[] | null,
  collections: Collection[] | null
) => {
  if (!links || !collections) return null;

  const collectionIds = links
    .filter((link) => link.bookmark_id === bookmarkId)
    .map((link) => link.collection_id);

  // Get the collections that match the collection IDs
  const bookmarkCollections = collections.filter((collection) =>
    collectionIds.includes(collection.collection_id)
  );

  return bookmarkCollections;
};

export const getBookmarksForCollection = <T extends Bookmark>(
  collectionId: string,
  links: Tables<"bookmark_link">[] | null,
  bookmarks: T[] | null
) => {
  if (!links || !bookmarks) return null;

  const bookmarkIds = links
    .filter((link) => link.collection_id === collectionId)
    .map((link) => link.bookmark_id);

  // Get the bookmarks that match the bookmark IDs
  const collectionBookmarks = bookmarks.filter((bookmark) =>
    bookmarkIds.includes(bookmark.bookmark_id)
  );

  return collectionBookmarks;
};
