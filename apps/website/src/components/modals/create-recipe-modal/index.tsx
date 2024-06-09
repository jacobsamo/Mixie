"use client";
import { createRecipeFromImage } from "@/actions/recipe-imports/image";
import { createRecipeFromLink } from "@/actions/recipe-imports/link";
import { createRecipeFromText } from "@/actions/recipe-imports/text";
import { createRecipeFromTitle } from "@/actions/recipe-imports/title";
import { HeaderControls } from "@/components/header-controls";
import { createRecipeOpen } from "@/components/providers/dialogs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "@radix-ui/react-slot";
import { useAtom } from "jotai";
import { ClipboardType, Image, Link, Pen } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { schema } from "./form";
import ImageForm from "./image-form";
import LinkForm from "./link-form";
import TextForm from "./text-form";
import TitleForm from "./title-form";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [open, setOpen] = useAtom(createRecipeOpen);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const imageToRecipe = useAction(createRecipeFromImage, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create recipe");
    },
    onSuccess: (data) => {
      // router.push(`/recipes/preview/${data}/edit`);
    },
  });

  const titleToRecipe = useAction(createRecipeFromTitle, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create recipe");
    },
    onSuccess: (data) => {
      router.push(`/recipes/preview/${data}/edit`);
    },
  });

  const linkToRecipe = useAction(createRecipeFromLink, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create recipe");
    },
    onSuccess: (data) => {
      // router.push(`/recipes/preview/${data}/edit`);
    },
  });

  const textToRecipe = useAction(createRecipeFromText, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create recipe");
    },
    onSuccess: (data) => {
      router.push(`/recipes/preview/${data}/edit`);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setLoading(true);
    switch (createRecipeType) {
      case "title":
        if (!data.title) return;
        titleToRecipe.execute({ title: data.title });
        break;
      case "text":
        textToRecipe.execute({ content: data.content });
        break;
      case "link":
        linkToRecipe.execute({ link: data.link });
        break;
      case "image":
        imageToRecipe.execute({ image: data.image });
        break;
    }
    setLoading(false);
  };

  const createRecipeModes: CreateRecipeModesProps[] = [
    {
      value: "title",
      Label: "Title",
      Icon: <Pen className="h-5 w-5" />,
      description: "Create manually",
    },
    {
      value: "link",
      Label: "Import",
      Icon: <Link className="h-5 w-5" />,
      description: "Import from another website",
    },
    {
      value: "text",
      Label: "Text",
      Icon: <ClipboardType className="h-5 w-5" />,
      description: "Paste from a document",
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
        <DialogHeader className="gap-2">
          <HeaderControls
            currentStepId={createRecipeType}
            goToPreviousStep={() => setCreateRecipeType(null)}
          />
          <DialogTitle>Create recipe</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>

        <Form {...form}>
          <form
            className="top-0 flex min-h-40 flex-col justify-start gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {!createRecipeType && (
              <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
                {createRecipeModes.map((mode) => (
                  <Button
                    className="flex h-full w-full flex-col gap-2"
                    variant="outline"
                    type="button"
                    onClick={() => setCreateRecipeType(mode.value)}
                  >
                    <Slot>{mode.Icon}</Slot>
                    <h3>{mode.Label}</h3>
                    <p className="font-normal text-sm">{mode.description}</p>
                  </Button>
                ))}
              </div>
            )}

            {createRecipeType == "title" && <TitleForm />}
            {createRecipeType == "link" && <LinkForm />}
            {createRecipeType == "text" && <TextForm />}
            {createRecipeType == "image" && <ImageForm />}

            {createRecipeType && (
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <Button
                  type="submit"
                  aria-label="continue with creating the recipe"
                  disabled={loading}
                >
                  Create Recipe
                  {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                </Button>{" "}
              </DialogFooter>
            )}

            {!createRecipeType && (
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
