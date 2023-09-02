import React, { DOMAttributes, useState } from "react";
import { Button } from "../../ui/button";
import RecipeValidationDialog from "./RecipeValidationDialog";
import { useFormContext } from "react-hook-form";
import { onSubmit } from "./form";
import { EyeIcon } from "lucide-react";

interface OverlayProps {
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  // handle submit property that is passed to the form with the correct onSubmit function
  // handleSubmit: (e: DOMAttributes<HTMLFormElement>) => void;
}

const Overlay = ({ onPreview, onSave, onPublish }: OverlayProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit } = useFormContext();
  return (
    <>
      <div className="fixed inset-0 inset-y-16  mr-3 flex flex-col items-end justify-between">
        {/* Top Bar */}
        <div className="z-50 flex  w-fit justify-end rounded-md bg-white p-4 shadow dark:bg-grey ">
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
            onClick={() => {
              setOpen(true);
            }}
          >
            Publish
          </Button>
        </div>

        {/* Bottom Bar */}
        <div className="z-50 flex justify-end">
          <Button
            ariaLabel="Save"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
      <RecipeValidationDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Overlay;
