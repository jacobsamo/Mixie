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
import { CopyIcon, PrinterIcon, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";

interface FeedbackDialogForm {
  name: string;
  email: string;
  type: "bug" | "feature" | "other";
  message: string;
}

const FeedbackDialog = () => {
  const { toast } = useToast();
  const { user } = useUser();

  const {} = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-white p-1 px-2 dark:bg-grey">
        <Share2 /> Share
      </DialogTrigger>
      <DialogContent className="print:hidden">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Share Feedback with the Meally team
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
