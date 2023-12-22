"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import VersionChip from "../modules/VersionChip";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

import { env } from "@/env.mjs";
import toast from "react-hot-toast";

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
});

const CreateRecipeDialog = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const methods = useForm<z.infer<typeof createRecipeSchema>>({
    resolver: zodResolver(createRecipeSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof createRecipeSchema>> = (
    values
  ) => {
    setLoading(true);
    const createRecipe = fetch("/api/recipes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
      },
      body: JSON.stringify({ title: values.title, link: values.link }),
    });

    toast.promise(createRecipe, {
      loading: "Creating Recipe...",
      success: (data) => {
        data.json().then((data) => {
          router.push(`/recipes/preview/${data.id}/edit`);
        });

        // router.push(`/recipes/preview/${}/edit`);
        setLoading(false);
        setOpen(false);
        return "Recipe Created";
      },
      error: (err) => {
        setLoading(false);
        setOpen(false);
        console.error(err);
        return "Error while creating recipe";
      },
    });
  };

  useEffect(() => {
    if (!open) {
      methods.reset();
      setLoading(false);
    }
  }, [open, methods]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-row gap-1 border-none outline-none">
        <PlusCircleIcon /> Create a recipe
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new recipe</DialogTitle>
          <DialogDescription>
            All you need is either your recipes name or a link to an existing
            recipe
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input {...register("title")} label="Title" autoFocus={false} />

          <p className="mx-auto">OR</p>

          <div>
            <div className="flex flex-row items-center gap-4">
              import a recipe <VersionChip release="beta" />
            </div>
            <Input
              {...register("link", {
                required: false,
              })}
              required={false}
              autoFocus={false}
              label="Recipe Url"
              placeholder="https://"
            />
          </div>
          <Button
            type="submit"
            aria-label="continue with creating the recipe"
            className="items-center font-semibold"
            disabled={loading}
          >
            Create Recipe
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
