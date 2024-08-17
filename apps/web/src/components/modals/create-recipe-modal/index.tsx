"use client";
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
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { requestSchema } from "@/lib/utils/recipe-imports";
import { RecipeCreationType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "@radix-ui/react-slot";
import { useMutation } from "@tanstack/react-query";
import { env } from "env";
import { useAtom } from "jotai";
import {
  BadgeAlertIcon,
  ClipboardType,
  Image,
  Link,
  Loader2,
  Pen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import ImageForm from "./image-form";
import LinkForm from "./link-form";
import TitleForm from "./title-form";
import UploadForm from "./upload-form";

interface CreateRecipeModesProps {
  value: RecipeCreationType;
  Label: string;
  description: string;
  Icon: React.ReactNode;
}

const CreateRecipeDialog = () => {
  const [open, setOpen] = useAtom(createRecipeOpen);
  const [createRecipeType, setCreateRecipeType] =
    useState<RecipeCreationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
  });

  const clearForm = () => {
    setLoading(false);
    form.reset();
    setCreateRecipeType(null);
    setUploadedImage(null);
  };

  useEffect(() => {
    console.warn("errors: ", form.formState.errors);
  }, [form.formState.errors]);

  const createRecipe = useMutation({
    mutationKey: ["createRecipe"],
    mutationFn: async (data: z.infer<typeof requestSchema>) => {
      const req = await fetch("/api/recipes/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });

      if (!req.ok) {
        throw Error(await req.json());
      }

      const res = await req.json();

      return res;
    },
    onSuccess: (data) => {
      toast.success(data.message, {
        description: "You will be redirected to the recipe page soon...",
      });
      clearForm();
      setOpen(false);
      router.push(`/recipes/preview/${data.recipe_id}/edit`);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof requestSchema>) => {
    setLoading(true);

    if (createRecipeType) {
      const newRecipe = {
        ...data,
        creation_type: createRecipeType,
      };
      await createRecipe.mutate(newRecipe);
      console.log("new recipe: ", newRecipe);
    } else {
      toast.error("No recipe type selected, select one to create a recipe");
    }
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
      value: "upload",
      Label: "Upload",
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
      <DialogContent
        className="max-h-[80%] min-h-[50%] w-11/12 md:w-1/2"
        showClose={false}
        onFocus={() => console.log("focused")}
      >
        <DialogHeader className="gap-2">
          <HeaderControls
            currentStepId={createRecipeType}
            goToPreviousStep={() => setCreateRecipeType(null)}
            closeModal={() => clearForm()}
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
                    key={mode.value}
                    className="border-secondary/30 flex h-full w-full flex-col gap-2 border shadow"
                    variant="outline"
                    type="button"
                    onClick={() => setCreateRecipeType(mode.value)}
                  >
                    <Slot>{mode.Icon}</Slot>
                    <h3>{mode.Label}</h3>
                    <p className="text-sm font-normal">{mode.description}</p>
                  </Button>
                ))}
              </div>
            )}

            {/*Disclaimer */}
            {createRecipeType && (
              <div className="border-yellow-300 rounded-lg border bg-yellow/20 p-4">
                <div className="flex items-start gap-4">
                  <BadgeAlertIcon className="text-yellow-500 h-6 w-6" />
                  <div className="flex-1">
                    <h3 className="text-yellow-900 text-sm font-semibold">
                      Disclaimer
                    </h3>
                    <p className="text-yellow-800 text-sm">
                      By creating a recipe, you confirm that the content is your
                      own original creation or that you have obtained permission
                      to use and share it.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {createRecipeType && loading && (
              <div className="bg-muted flex h-48 flex-col items-center justify-center rounded-lg p-4 text-center transition-transform">
                <Loader2 className="ml-2 h-16 w-16 animate-spin" />
                <p>
                  Your recipe is being created. This may take a few seconds to a
                  few minutes.
                </p>
              </div>
            )}

            {createRecipeType == "title" && !loading && <TitleForm />}
            {createRecipeType == "link" && !loading && <LinkForm />}
            {createRecipeType == "upload" && !loading && <UploadForm />}
            {createRecipeType == "image" && !loading && (
              <ImageForm
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
              />
            )}

            {createRecipeType && (
              <DialogFooter>
                <DialogClose onClick={() => clearForm()}>Cancel</DialogClose>
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
                <DialogClose onClick={() => clearForm()}>Cancel</DialogClose>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
