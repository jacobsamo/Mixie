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

const ImageUpload = () => {
  const [open, setOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);


  //TODO: add image upload functionality
  function handleImageUpload() {
    setUploadLoading(true);
    setTimeout(() => {
      setUploadLoading(false);
      setOpen(false);
    }, 2000);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          ariaLabel="edit or upload an image"
          variant={'secondary'}
          type="button"
          className="w-52 m-2"
          LeadingIcon={<ImagePlus />}
          onClick={() => setOpen(true)}
        >
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader >
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>Upload an image for your recipe</DialogDescription>
        </DialogHeader>

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
          <Button ariaLabel="save" type="button" className="w-52 m-2" onClick={() => handleImageUpload()}>
            Save
            {uploadLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
