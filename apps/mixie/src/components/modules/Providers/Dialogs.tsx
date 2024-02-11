"use client";
import { SearchDialog } from "@/components/elements/Search";
import { atom } from "jotai";
import dynamic from "next/dynamic";

export const createRecipeOpen = atom<boolean>(false);
export const bookmarkRecipeOpen = atom<{
  open: boolean;
  recipeId: string | null;
  userId: string | null;
}>({ open: false, recipeId: null, userId: null });

export const giveFeedbackOpen = atom<boolean>(false);
export const searchOpen = atom<boolean>(false);
export const collectionCreateOpen = atom<boolean>(false);

const CreateRecipeDialog = dynamic(
  () => import("@/components/elements/CreateRecipeDialog"),
  {
    ssr: false,
  }
);

const FeedbackDialog = dynamic(
  () => import("@/components/elements/FeedbackDialog"),
  {
    ssr: false,
  }
);

// const BookmarkDialog = dynamic(
//   () => import("@/components/elements/BookmarkRecipeDialog"),
//   {
//     ssr: false,
//   }
// );

const Dialogs = () => {
  return (
    <>
      <CreateRecipeDialog />
      <FeedbackDialog />
      <SearchDialog />
    </>
  );
};

export default Dialogs;
