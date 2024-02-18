"use client";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import RecipeValidationDialog from "./recipe-validation-dialog";
import SubmittingButton from "./submitting-button";
import { FeedbackButton, FeedbackDialogTrigger } from "../open-dialogs";

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
      <div className="fixed bottom-5 right-3 z-50 flex justify-end gap-2">
        <FeedbackDialogTrigger className="bg-grey" />
        <SubmittingButton aria-label="Save" type="submit">
          Save
        </SubmittingButton>
      </div>

      <RecipeValidationDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Overlay;
