"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { env } from "env";
import toast from "react-hot-toast";
import { type Collection, collectionSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateCollectionDialog = ({ userId }: { userId: string }) => {
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
      <DialogTrigger className="flex flex-row gap-1 border-none outline-none">
        <PlusCircleIcon /> Create a collection
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
