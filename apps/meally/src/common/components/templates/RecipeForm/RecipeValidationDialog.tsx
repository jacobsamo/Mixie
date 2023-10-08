"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import * as z from "zod";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@components/ui/button";
import { onSubmit } from "./form";
import { ArrowLeftIcon } from "lucide-react";
import { Textarea } from "@components/ui/textarea";
import TagInput from "@components/ui/taginput";
import { recipeFormSchema } from "@/src/db/zodSchemas";
import { Switch, SwitchInput } from "../../ui/switch";

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
        <div className="mx-auto flex flex-col p-2 md:p-0">
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
        </div>
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
          <Button
            ariaLabel="save"
            type="button"
            className="m-2 w-52"
            onClick={() => {
              handleSubmit(onSubmit);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
