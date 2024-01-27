"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "env";
import { Plus, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { collectionSchema } from "@/types";

export interface CreateCollectionDialogProps {
  userId: string;
}

const CreateCollectionDialog = ({
  userId,
}: CreateCollectionDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const methods = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      uid: "",
      userId: "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof collectionSchema>> = (
    values
  ) => {
    setLoading(true);

    const createCollection = fetch(`/api/users/${userId}/collections/create`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
      },
    });

    toast.promise(createCollection, {
      loading: "Bookmarking recipe...",
      success: (data) => {
        setLoading(false);
        setOpen(false);
        return "Bookmark added successfully!";
      },
      error: (err) => {
        setLoading(false);
        setOpen(false);
        console.error(err);
        return "Error while bookmarking recipe";
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-row gap-1 border-none font-semibold text-yellow outline-none">
        <Plus /> New Collection
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input {...register("title")} label="Title" required />
          <Input {...register("description")} label="Description" />

          <Button type="submit">Create Collection</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;
