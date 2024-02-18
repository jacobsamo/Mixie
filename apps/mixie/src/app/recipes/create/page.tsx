"use client";
import { createRecipeOpen } from "@/components/providers/dialogs";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const CreateRecipePage = () => {
  const [, setCreateRecipeOpen] = useAtom(createRecipeOpen);
  useEffect(() => {
    setCreateRecipeOpen(true);
  }, []);

  return <></>;
};

export default CreateRecipePage;
