"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { createCollection } from "@/actions/user/bookmarks/create-collection";
import { useStore } from "@/components/providers/store-provider";
import { Input } from "@/components/ui/advanced-components/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const createCollectionSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
});

const CreateCollectionDialog = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setCollections } = useStore((store) => store);

  const methods = useForm<z.infer<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<
    z.infer<typeof createCollectionSchema>
  > = async (values) => {
    setLoading(true);
    const res = await createCollection(values);

    if (res && res.data) {
      setCollections([res.data]);
      toast.success("Created collection");
    }

    setOpen(false);
    setLoading(false);
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

          <Button disabled={loading} type="submit">
            Create Collection
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;
