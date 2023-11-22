import React, { DOMAttributes, useState } from "react";
import { Button } from "../../ui/button";
import RecipeValidationDialog from "./RecipeValidationDialog";
import { useFormContext } from "react-hook-form";
import { onSubmit } from "./form";
import { EyeIcon } from "lucide-react";

interface OverlayProps {
  onPreview: () => void;
  isDisabled: boolean;
  // handle submit property that is passed to the form with the correct onSubmit function
  // handleSubmit: (e: DOMAttributes<HTMLFormElement>) => void;
}

const Overlay = ({ onPreview, isDisabled }: OverlayProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit } = useFormContext();
  return (
    <>
      <div className="fixed right-3 top-3 z-50 flex w-fit justify-end rounded-md bg-white p-4 shadow dark:bg-grey ">
        <Button
          ariaLabel="Preview"
          type="button"
          className="mr-2"
          TrailingIcon={<EyeIcon />}
          onClick={onPreview}
        >
          Preview
        </Button>
        <Button
          ariaLabel="Publish"
          type="submit"
          onClick={() => {
            handleSubmit(onSubmit);
            setOpen(true);
          }}
        >
          Publish
        </Button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-5 right-3 z-50 flex justify-end">
        <Button ariaLabel="Save" onClick={handleSubmit(onSubmit)} type="submit">
          Save
        </Button>
      </div>

      <RecipeValidationDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Overlay;
