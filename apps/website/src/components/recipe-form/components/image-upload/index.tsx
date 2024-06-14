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
import { env } from "env";
import {
  Edit2,
  LinkIcon,
  PlusCircleIcon,
  SearchIcon,
  UploadIcon,
} from "lucide-react";
import { useState } from "react";
import { createApi } from "unsplash-js";
import { HeaderControls } from "../../../header-controls";
import SearchUpload from "./search-upload";
import UrlUpload from "./url-upload";
import Upload from "./user-upload";
import { useFormContext } from "react-hook-form";
import { recipeClientFormSchema } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as z from "zod";
import Link from "next/link";

type ImageUploadType = "url" | "upload" | "search";

const ImageUpload = () => {
  const [uploadType, setUploadType] = useState<ImageUploadType | null>(null);

  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof recipeClientFormSchema>>();

  const image = watch("image_url");
  const image_attributes = watch("image_attributes");

  return (
    <div
      className={cn(
        "group relative my-2 aspect-video max-h-[300px] max-w-full resize rounded-xl border p-2",
        {
          "border-red shadow shadow-red":
            errors.image_url || errors.image_attributes?.alt,
        }
      )}
    >
      {image && (
        <>
          <Image
            src={image ?? "/images/placeholder.webp"}
            alt={image_attributes?.alt ?? ""}
            width={800}
            height={600}
            priority
            unoptimized
            className="aspect-video h-full w-full rounded-xl object-cover"
          />
          {image_attributes?.photographer &&
            image_attributes.photographer_link && (
              <div className="textOnBackground absolute bottom-2 left-2 bg-gray-700/20 text-white drop-shadow-xl">
                Photo by{" "}
                <Link
                  href={image_attributes.photographer_link}
                  target="_blank"
                  className="underline underline-offset-2"
                >
                  {image_attributes.photographer}
                </Link>{" "}
                on{" "}
                <Link
                  href={
                    "https://unsplash.com?utm_source=mixie&utm_medium=referral"
                  }
                  target="_blank"
                  className="underline underline-offset-2"
                >
                  Unsplash
                </Link>
              </div>
            )}
        </>
      )}

      <Dialog>
        <DialogTrigger
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-fit w-fit transform flex-col items-center gap-2 px-1 text-center",
            {
              "textOnBackground opacity-30 group-hover:opacity-100":
                image != null,
              "rounded-xl bg-red p-2 text-white":
                errors.image_url || errors.image_attributes?.alt,
            }
          )}
        >
          <p>{errors.image_url?.message}</p>

          {image ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <Edit2 /> Edit Image
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2">
              <PlusCircleIcon /> Add an Image
            </div>
          )}
        </DialogTrigger>
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
                className="justify-start gap-2"
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
    </div>
  );
};

export default ImageUpload;
