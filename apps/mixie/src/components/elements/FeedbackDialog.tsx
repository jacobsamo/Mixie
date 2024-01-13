"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BugIcon,
  Lightbulb,
  Loader2,
  MessageCirclePlus
} from "lucide-react";
import React from "react";

import { DialogClose } from "@radix-ui/react-dialog";

interface FeedbackDialogProps {
  Trigger?: React.ReactNode;
}

const FeedbackDialog = ({ Trigger }: FeedbackDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {Trigger ? (
          Trigger
        ) : (
          <div className="flex flex-row gap-1 border-none outline-none">
            <MessageCirclePlus /> Feedback
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="flex h-[80%] max-w-full flex-col gap-2 p-3 lg:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Share Feedback with the Mixie team
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="feature" className="h-full">
          <TabsList>
            <TabsTrigger value="feature" className="flex flex-row gap-2">
              <Lightbulb />
              Feature Request
            </TabsTrigger>
            <TabsTrigger value="bug" className="flex flex-row gap-2">
              <BugIcon /> Bug Report
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feature" className="h-full">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdFXWvAvMdvuCXySmMJSCTjz-YN0X0m1f8pVG1pZ0Pk2kqihg/viewform?embedded=true"
            >
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </iframe>
          </TabsContent>
          <TabsContent value="bug" className="h-full">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdydiU39LqmDfraMErw1u8WvfxkRoqnvdct08MAykM5W8vxww/viewform?embedded=true"
            >
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </iframe>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <DialogClose>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
