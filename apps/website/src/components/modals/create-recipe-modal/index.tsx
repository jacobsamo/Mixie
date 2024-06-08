"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { recipeClientFormSchema } from "@/types";
import {
  ClipboardType,
  ClipboardTypeIcon,
  Image,
  Link,
  LinkIcon,
  Pen,
  SearchIcon,
  UploadIcon,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { HeaderControls } from "@/components/header-controls";
import { useAtom } from "jotai";
import { createRecipeOpen } from "@/components/providers/dialogs";
import { Slot } from "@radix-ui/react-slot";
import ImageForm from "./image-form";
import TitleForm from "./title-form";
import LinkForm from "./link-form";
import TextForm from "./text-form";

type RecipeCreationMode = "title" | "text" | "link" | "image";
interface CreateRecipeModesProps {
  value: RecipeCreationMode;
  Label: string;
  description: string;
  Icon: React.ReactNode;
}

const CreateRecipeDialog = () => {
  const [createRecipeType, setCreateRecipeType] =
    useState<RecipeCreationMode | null>(null);
  const [open, setOpen] = useAtom(createRecipeOpen);

  const createRecipeModes: CreateRecipeModesProps[] = [
    {
      value: "title",
      Label: "Title",
      Icon: <Pen className="h-5 w-5" />,
      description: "Create manually",
    },
    {
      value: "text",
      Label: "Text",
      Icon: <ClipboardType className="h-5 w-5" />,
      description: "Paste from a document",
    },
    {
      value: "link",
      Label: "Import",
      Icon: <Link className="h-5 w-5" />,
      description: "Import from another website",
    },
    {
      value: "image",
      Label: "Image",
      Icon: <Image className="h-5 w-5" />,
      description: "Upload or take a photo",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className="max-h-[80%] min-h-[50%] w-11/12 md:w-1/2"
        showClose={false}
        onFocus={() => console.log("focused")}
      >
        <HeaderControls
          currentStepId={createRecipeType}
          goToPreviousStep={() => setCreateRecipeType(null)}
        />
        <DialogHeader>
          <DialogTitle>Create recipe</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>

        {!createRecipeType && (
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
            {createRecipeModes.map((mode) => (
              <Button
                className="flex h-full w-full flex-col gap-2"
                variant="outline"
                onClick={() => setCreateRecipeType(mode.value)}
              >
                <Slot>{mode.Icon}</Slot>
                <h3>{mode.Label}</h3>
                <p>{mode.description}</p>
              </Button>
            ))}
          </div>
        )}

        {createRecipeType == "image" && <ImageForm />}
        {createRecipeType == "title" && <TitleForm />}
        {createRecipeType == "link" && <LinkForm />}
        {createRecipeType == "text" && <TextForm />}

        {createRecipeType === null && (
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
