import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { ImagePlus, Loader2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { recipeFormSchema } from '@/src/db/zodSchemas';
import { useFormContext } from 'react-hook-form';
import * as z from 'zod';

// TODO: add image upload functionality with uploadThing https://uploadthing.com/dashboard
const ImageUpload = () => {
  const { register } = useFormContext<z.infer<typeof recipeFormSchema>>();
  const [open, setOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          ariaLabel="edit or upload an image"
          variant={'secondary'}
          type="button"
          className="w-52 m-2"
          LeadingIcon={<ImagePlus />}
        >
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>Upload an image for your recipe</DialogDescription>
        </DialogHeader>
        <Input
          {...register('info.imgUrl', {
            required: true,
          })}
          required
          label="Image Url"
          placeholder="https://"
        />
        <Input
          {...register('info.imgAlt', {
            required: true,
          })}
          required
          label="Img Alt Text"
          tooltip="A short description of the image, this helps people with screen readers to understand the image"
          hint="A short description of the image"
        />
        <DialogFooter>
          <Button
            ariaLabel="cancel"
            variant={'destructive'}
            type="button"
            className="w-52 m-2"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            ariaLabel="save"
            type="button"
            className="w-52 m-2"
            // onClick={() => handleImageUpload()}
            onClick={() => setOpen(false)}
          >
            Save
            {uploadLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
