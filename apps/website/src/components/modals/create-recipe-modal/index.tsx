"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { recipeClientFormSchema } from "@/types";
import {
    LinkIcon,
    SearchIcon,
    UploadIcon
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { HeaderControls } from "@/components/header-controls";


type RecipeCreationMode = "title" | "text" | "link" | "image";

const ImageUpload = () => {
  const [uploadType, setUploadType] = useState<RecipeCreationMode | null>(null);

  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof recipeClientFormSchema>>();

  return (
    <Dialog>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className="max-h-[80%] w-11/12 md:w-1/2"
        showClose={false}
        onFocus={() => console.log("focused")}
      >
        <HeaderControls
          currentStepId={uploadType}
          goToPreviousStep={() => setUploadType(null)}
        />

        <DialogHeader className="py-1">
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        {!uploadType && (
          <div className="flex flex-col gap-4 py-4">
            <Button
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 peer-checked:border-primary hover:bg-accent hover:text-accent-foreground"
              variant="outline"
              onClick={() => setUploadType("url")}
            >
              <LinkIcon className="h-5 w-5" />
              Upload from URL
            </Button>
            <Button
              className="justify-start gap-2"
              variant="outline"
              onClick={() => setUploadType("upload")}
            >
              <UploadIcon className="h-5 w-5" />
              Upload from File
            </Button>
            <Button
              className="justify-start gap-2"
              variant="outline"
              onClick={() => setUploadType("search")}
            >
              <SearchIcon className="h-5 w-5" />
              Search for Image
            </Button>
          </div>
        )}

        {uploadType === "url" && <UrlUpload />}
        {uploadType === "upload" && <Upload />}
        {uploadType === "search" && <SearchUpload />}

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
