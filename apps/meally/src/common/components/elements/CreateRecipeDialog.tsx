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
import { useForm } from "react-hook-form";
import * as z from "zod";
import VersionChip from "../modules/VersionChip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const createRecipeSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
});

const CreateRecipeDialog = () => {
  const router = useRouter();
  const { toast } = useToast();
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

  function onSubmit(values: z.infer<typeof createRecipeSchema>) {
    setLoading(true);
    fetch("/api/recipes/create", {
      method: "POST",
      body: JSON.stringify({ title: values.title, link: values.link }),
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          toast({
            title: "Recipe Created",
          });
          router.push(`/recipes/${data.id}/edit`);
          setLoading(false);
          setOpen(false);
        });
      }
      if (res.status == 400) {
        toast({
          title: "An Error Occurred",
          description: "This Error more the likely occurred due to a bug",
        });
      }
    });
    setLoading(false);
    setOpen(false);
  }

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
          <Input {...register("title")} label="Title" />
          <p className="mx-auto">OR</p>

          <div>
            <div className="flex flex-row items-center gap-4">
              import a recipe <VersionChip release="beta" />
            </div>
            <Input
              {...register("link")}
              label="Recipe Url"
              placeholder="https://"
            />
          </div>
          <Button
            ariaLabel="continue with creating the recipe"
            className="items-center font-semibold"
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
