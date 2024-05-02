"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TablesInsert } from "database.types";
import { useAtom } from "jotai";
import { Bug, CircleHelp, Lightbulb } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { giveFeedbackOpen } from "../providers/dialogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "@/types/zodSchemas";
import { env } from "env";
import { createClient } from "@/server/supabase/client";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";

interface FeedbackDialogProps {
  Trigger?: React.ReactNode;
}

const FeedbackDialog = ({ Trigger }: FeedbackDialogProps) => {
  const path = usePathname();
  const [open, setOpen] = useAtom(giveFeedbackOpen);
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TablesInsert<"feedback">>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: "bug",
      page: path,
      user_email: user?.email,
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit: SubmitHandler<TablesInsert<"feedback">> = (data) => {
    try {
      const create = fetch(`/api/feedback`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      toast.promise(create, {
        loading: "Sending feedback...",
        success: () => {
          reset();
          setOpen(false);
          return "Thank you for your feedback";
        },
        error: "Failed to send your feedback",
      });
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant={"secondary"}>Feedback</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Make BuzzTrip better by providing feedback
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={field.onChange}
              >
                <ToggleGroupItem value="bug" className="inline-flex gap-2">
                  <Bug /> Bug
                </ToggleGroupItem>
                <ToggleGroupItem value="feature" className="inline-flex gap-2">
                  <Lightbulb /> Feature
                </ToggleGroupItem>
                <ToggleGroupItem value="other" className="inline-flex gap-2">
                  <CircleHelp /> Other
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          />
          {!user && (
            <>
              <Label htmlFor="user_email">Email</Label>
              <Input
                {...register("user_email", { required: true })}
                required
                placeholder="Email"
                error={errors.title}
              />
            </>
          )}

          <Label htmlFor="title">Title</Label>
          <Input
            {...register("title", { required: true })}
            required
            placeholder="Title"
            error={errors.title}
          />

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            control={control}
            required
            placeholder="Description"
            error={(!!errors && errors?.description?.message) || ""}
          />

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
