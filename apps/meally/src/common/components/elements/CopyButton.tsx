"use client";
import React from "react";
import { useToast } from "@components/ui/use-toast";
import { Button, ButtonProps } from "@components/ui/button";
import { CopyIcon } from "lucide-react";

interface CopyButtonProps extends ButtonProps {
  /**
   * The text you want copied to the clipboard
   */
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps, props) => {
  const { toast } = useToast();

  const copy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        toast({
          title: "Copied to clipboard",
        })
      )
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Button
      unstyled={true}
      onClick={() => copy()}

      {...props}
    >
      <CopyIcon className="m-auto" />
    </Button>
  );
};

export default CopyButton;
