"use client";
import { SearchDialog } from "@/components/search";

import dynamic from "next/dynamic";

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

const BookmarkRecipeDialog = dynamic(
  () => import("@/components/modals/bookmark-recipe-modal"),
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
      <BookmarkRecipeDialog />
    </>
  );
};

export default Dialogs;
