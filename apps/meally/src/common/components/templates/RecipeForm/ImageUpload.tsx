import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { Input } from "../../ui/input";
import { recipeFormSchema } from "@db/zodSchemas";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import ImageUploadDialog from "../../elements/ImageUploadDialog";
import { UploadFileResponse } from "uploadthing/client";

const ImageUpload = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<z.infer<typeof recipeFormSchema>>();
  const [open, setOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (errors.info?.imgUrl || errors.info?.imgAlt) {
      setOpen(true);
    }
  }, []);

  const setImages = (image: string) => {
    setUploadLoading(true);
    setValue("info.imgUrl", image);
    setUploadLoading(false);
  };

  return (
    <ImageUploadDialog
      title="Edit Image"
      description="Upload an image for your recipe"
      setImage={setImages}
      externalOpen={open}
      setExternalOpen={setOpen}
      Trigger={
        <DialogTrigger asChild>
          <Button
            ariaLabel="edit or upload an image"
            variant={"secondary"}
            type="button"
            className="m-2 w-52"
            LeadingIcon={<ImagePlus />}
          >
            Upload Image
          </Button>
        </DialogTrigger>
      }
    >
      <div>
        <div className="flex items-center">
          <div className="w-1/2 border-t border-grey dark:border-white"></div>
          <span className="mx-2">OR</span>
          <div className="w-1/2 border-b border-grey dark:border-white"></div>
        </div>
        <Input
          {...register("info.imgUrl", {
            required: true,
          })}
          required
          label="Image Url"
          placeholder="https://"
        />
        <Input
          {...register("info.imgAlt", {
            required: true,
          })}
          error={errors.info?.imgAlt}
          required
          label="Img Alt Text"
          tooltip="A short description of the image, this helps people with screen readers to understand the image"
          hint="A short description of the image"
        />
      </div>
    </ImageUploadDialog>
  );
};

export default ImageUpload;
