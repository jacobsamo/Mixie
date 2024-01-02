"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import TagInput from "@components/ui/taginput";
import { Textarea } from "@components/ui/textarea";
import { ArrowLeftIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@components/ui/button";
import { SwitchInput } from "@components/ui/switch";
import { onSubmit } from "./form";
import RecipeValidationDialog from "./RecipeValidationDialog";

interface OverlayProps {
  onPreview: () => void;
  isDisabled: boolean;
  // handle submit property that is passed to the form with the correct onSubmit function
  // handleSubmit: (e: DOMAttributes<HTMLFormElement>) => void;
}

const Overlay = ({ onPreview, isDisabled }: OverlayProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, register, formState } = useFormContext();

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  return (
    <>
      <div className="fixed right-3 top-3 z-50 flex w-fit justify-end rounded-md bg-white p-4 shadow dark:bg-grey ">
        <Button
          aria-label="Preview"
          type="button"
          className="mr-2"
          TrailingIcon={<EyeIcon />}
          onClick={onPreview}
        >
          Preview
        </Button>
        <Button
          aria-label="Publish"
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Publish
        </Button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-5 right-3 z-50 flex justify-end">
        <Button
          aria-label="Save"
          type="submit"
          disabled={formState.isSubmitting} 
        >
          Save
        </Button>
      </div>

      <RecipeValidationDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Overlay;
