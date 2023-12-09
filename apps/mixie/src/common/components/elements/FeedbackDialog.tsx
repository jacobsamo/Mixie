"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { InfoIcon, BugIcon, Lightbulb } from "lucide-react";
import { Button } from "@components/ui/button";
import Link from "next/link";

import { Input } from "@components/ui/input";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import { register } from "module";
import { Textarea } from "@components/ui/textarea";
import { LetterSpacingIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

type FeedbackType = "bug" | "feature" | "other";

interface FeedbackDialogForm {
  name: string;
  email: string;
  type: FeedbackType;
  message: string;
}

const TypeIcon = ({ type }: { type: FeedbackType }) => {
  switch (type) {
    case "bug":
      return <BugIcon />;
    case "feature":
      return <Lightbulb />;
    case "other":
      return <InfoIcon />;
  }
};

const FeedbackDialog = () => {
  const { user } = useUser();

  const { handleSubmit, getValues, setValue, control } =
    useForm<FeedbackDialogForm>({
      defaultValues: {
        name: user?.name || "",
        email: user?.email,
      },
    });

  const onSubmit = (data: FeedbackDialogForm) => {
    console.log(data);
    toast.success("Feedback Submitted");
  };

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-white p-1 px-2 dark:bg-grey">
        <LetterSpacingIcon /> Feedback
      </DialogTrigger>
      <DialogContent className="print:hidden">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Share Feedback with the Mixie team
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <span className="flex flex-row gap-2">
            {["bug", "feature", "other"].map((type, index) => (
              <Button
                key={index}
                ariaLabel={`get feedback type to ${type}`}
                unstyled
                onClick={() => {
                  setValue("type", type as FeedbackType);
                }}
                className={`${getValues("type") == type ? "" : "opacity-75"}`}
              >
                <TypeIcon type={type as FeedbackType} />
                {type}
              </Button>
            ))}
          </span>

          <Textarea control={control} id="message" placeholder="Feedback" />

          <Button ariaLabel="submit feedback" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
