"use client";
import { Button } from "@components/ui/button";
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
import { recipeFormSchema } from "@db/zodSchemas";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as z from "zod";
import { SwitchInput } from "../../ui/switch";
import { onSubmit } from "./form";

interface CreateRecipeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateRecipeDialog = ({ open, setOpen }: CreateRecipeDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, control } =
    useFormContext<z.infer<typeof recipeFormSchema>>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Recipe</DialogTitle>
          <DialogDescription>
            The final steps before you publish your recipe
          </DialogDescription>
        </DialogHeader>
        <form className="mx-auto flex flex-col p-2 md:p-0">
          <Input
            {...register("title", {
              required: true,
            })}
            required
            label="Title"
          />
          <Textarea id="description" label="Description" control={control} />
          <TagInput
            name="info.keywords"
            control={control}
            placeholder="Keywords (separated by a comma)"
            hint="Keywords will be used to help users find your recipe."
          />
          <Controller
            control={control}
            name={"info.isPublic"}
            defaultValue={false}
            render={({ field }) => (
              <SwitchInput
                name={field.name}
                checked={field.value ? field.value : false}
                onCheckedChange={field.onChange}
                label="Public"
                tooltip="Makes your recipe visible to everyone outside of your group"
              />
            )}
          />
          <DialogFooter>
            <Button
              ariaLabel="go back"
              variant={"destructive"}
              type="button"
              className="m-2 w-52"
              onClick={() => setOpen(false)}
              LeadingIcon={<ArrowLeftIcon />}
            >
              Go Back
            </Button>
            <Button ariaLabel="save recipe" type="submit" className="m-2 w-52">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
