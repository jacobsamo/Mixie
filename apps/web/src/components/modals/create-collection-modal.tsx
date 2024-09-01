"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { createCollection } from "@/actions/user/bookmarks/create-collection";
import { useStore } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "../ui/switch";

const createCollectionSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  public: z.boolean().default(false),
});

const CreateCollectionDialog = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setCollections } = useStore((store) => store);

  const form = useForm<z.infer<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

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
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-base">Public</FormLabel>
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit">
              Create Collection
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;
