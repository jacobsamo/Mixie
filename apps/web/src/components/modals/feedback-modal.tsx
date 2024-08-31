"use client";
import { Input } from "@/components/ui/advanced-components/input";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { feedbackSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@mixie/supabase/client";
import { TablesInsert } from "@mixie/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "env";
import { Bug, CircleHelp, Lightbulb, MessageCirclePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FeedbackDialogProps {
  trigger?: "icon" | "button";
  props?: ButtonProps;
  text?: string;
  className?: string;
}

const FeedbackDialog = ({
  trigger = "button",
  props,
  text,
  className,
}: FeedbackDialogProps) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
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
    getValues,
  } = useForm<TablesInsert<"feedback">>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: "bug",
      page: path,
      user_email: user?.email,
    },
  });

  useEffect(() => {
    console.log(`error`, {
      errors,
      values: getValues(),
    });
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

  const Trigger = () => {
    if (trigger === "icon") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              type="button"
              aria-label="give feedback to the mixie team"
              className={cn(
                "flex flex-row items-center justify-center gap-1 rounded-xl border-none p-2 outline-none",
                className
              )}
            >
              <MessageCirclePlus className="h-8 w-8" />
            </TooltipTrigger>
            <TooltipContent>Provide feedback to the Mixie team</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Button
        LeadingIcon={<MessageCirclePlus />}
        aria-label="give feedback to the mixie team"
        variant={"secondary"}
        className={cn(
          "border-none text-step--3 outline-none hover:text-white",
          className
        )}
        {...props}
      >
        {text ? text : "Feedback"}
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild type="button">
        <Trigger />
      </DialogTrigger>
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
