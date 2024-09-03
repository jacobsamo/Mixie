import { CardRecipe } from "@/components/cards";
import { Store } from "@/lib/stores";
import { StateCreator } from "zustand";

interface BookmarkRecipeState {
  open: boolean;
  recipe: CardRecipe | null;
}

export type ModalState = {
  bookmarkRecipe: BookmarkRecipeState;
  createRecipeOpen: boolean;
  searchOpen: boolean;
};

export type ModalActions = {
  setBookmarkRecipe: (open: boolean, recipe: CardRecipe | null) => void;
  setCreateRecipeOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

export type ModalSlice = ModalState & ModalActions;

export const initialModalState: ModalState = {
  bookmarkRecipe: {
    open: false,
    recipe: null,
  },
  createRecipeOpen: false,
  searchOpen: false,
};

export const createModalSlice: StateCreator<Store, [], [], ModalSlice> = (
  set
) => ({
  ...initialModalState,
  setBookmarkRecipe: (open: boolean, recipe: CardRecipe | null) =>
    set(() => ({
      bookmarkRecipe: {
        open,
        recipe,
      },
    })),
  setCreateRecipeOpen: (open: boolean) =>
    set(() => ({
      createRecipeOpen: open,
    })),
  setSearchOpen: (open: boolean) =>
    set(() => ({
      searchOpen: open,
    })),
});
