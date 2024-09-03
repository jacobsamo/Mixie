"use client";
import { useStore } from "@/components/providers/store-provider";
import { useEffect } from "react";

const CreateRecipePage = () => {
  const { setCreateRecipeOpen } = useStore((store) => store);
  useEffect(() => {
    setCreateRecipeOpen(true);
  }, [setCreateRecipeOpen]);

  return <></>;
};

export default CreateRecipePage;
