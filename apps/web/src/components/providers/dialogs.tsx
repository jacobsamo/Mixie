"use client";
import { SearchDialog } from "@/components/search";
import { atom } from "jotai";
import dynamic from "next/dynamic";

export const createRecipeOpen = atom<boolean>(false);
export const bookmarkRecipeOpen = atom<{
  open: boolean;
  recipe_id: string | null;
  userId: string | null;
}>({ open: false, recipe_id: null, userId: null });

export const giveFeedbackOpen = atom<boolean>(false);
export const searchOpen = atom<boolean>(false);
export const collectionCreateOpen = atom<boolean>(false);

const CreateRecipeDialog = dynamic(
  () => import("@/components/modals/create-recipe-modal"),
  {
    ssr: false,
  }
);

const FeedbackDialog = dynamic(
  () => import("@/components/modals/feedback-modal"),
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
      {/* <FeedbackDialog /> */}
      <SearchDialog />
    </>
  );
};

export default Dialogs;
