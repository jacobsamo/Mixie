import React from "react";
// import FeedbackDialog from "./FeedbackDialog";
import { MessageCirclePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";

const FeedbackDialog = dynamic(() => import("./FeedbackDialog"), {
  ssr: false,
});

const FeedbackButton = () => {
  return (
    <FeedbackDialog
      Trigger={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex flex-row gap-1 border-none outline-none">
                <MessageCirclePlus className="h-8 w-8" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Provide feedback to the Mixie team</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
};

export default FeedbackButton;
