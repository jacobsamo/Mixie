"use client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const SubmittingButton = (props: ButtonProps) => {
  const params = useSearchParams();
  const find = params.get("submitting");
  const submitting = find === "true" ? true : false;

  return (
    <Button {...props} disabled={submitting}>
      {props.children}
      {submitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default SubmittingButton;
