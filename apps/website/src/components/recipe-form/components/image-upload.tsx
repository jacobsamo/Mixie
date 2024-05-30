"use client";
import { Input as AdvancedInput } from "@/components/ui/advanced-components/input";
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
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { recipeClientFormSchema } from "@/types/zodSchemas";
import { useQuery } from "@tanstack/react-query";
import { env } from "env";
import { LinkIcon, Search, SearchIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { createApi } from "unsplash-js";
import * as z from "zod";
import { HeaderControls } from "./header-controls";

type ImageUploadType = "url" | "upload" | "search";

const api = createApi({
  accessKey: env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const ImageUpload = () => {
  const [uploadType, setUploadType] = useState<ImageUploadType | null>(null);
  const [unsplashImageSearch, setUnsplashImageSearch] = useState("");

  const { data: searchedPhotos, refetch: refetchImages } = useQuery({
    queryKey: ["image_search"],
    queryFn: async () => {
      const { response, errors } = await api.search.getPhotos({
        query: unsplashImageSearch,
      });

      if (errors) console.error(errors);

      return response;
    },
  });
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof recipeClientFormSchema>>();

  const setImages = (image: string) => {
    // setLoading(true);
    setValue("image_url", image);
    setValue("image_attributes.source", "upload");
    // setLoading(false);
  };

  useEffect(() => {
    refetchImages();
  }, [unsplashImageSearch]);

  const DisplayForm = () => {
    switch (uploadType) {
      case "url":
        return (
          <>
            <FormField
              control={control}
              name="image_url"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl className="flex">
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="image_attributes.alt"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text</FormLabel>
                  <FormControl className="flex">
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A short description of the image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "upload":
        return (
          <>
            <UploadDropzone
              className=""
              appearance={{
                container: "border border-white",
              }}
              endpoint="imageUploader"
              // onUploadBegin={() => setLoading(true)}
              onClientUploadComplete={(res) => {
                // Do something with the response
                res && setImages(res[0].url);

                // setLoading(false);
                toast.success("Image uploaded!");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                // setLoading(false);
                toast.error("Error uploading image");
                console.error(error);
              }}
            />

            <FormField
              control={control}
              name="image_attributes.alt"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text</FormLabel>
                  <FormControl className="flex">
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A short description of the image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "search":
        return (
          <>
            {/* <AdvancedInput
              // label="Search"
              name="unsplashImageSearch"
              placeholder="Search for an image"
              type="search"
              LeadingIcon={<Search />}
              value={unsplashImageSearch}
              onChange={(e) => setUnsplashImageSearch(e.target.value)}
            /> */}
            <Input
              name="unsplashImageSearch"
              placeholder="Search for an image"
              type="search"
              // LeadingIcon={<Search />}
              value={unsplashImageSearch}
              onChange={(e) => setUnsplashImageSearch(e.target.value)}
            />
            <div className="group flex h-fit w-full flex-wrap gap-2 overflow-y-auto">
              {searchedPhotos?.results.map((photo) => (
                <Button
                  unstyled
                  onClick={() => {
                    setValue("image_url", photo.urls.regular);
                    setValue(
                      "image_attributes.alt",
                      photo.alt_description ?? ""
                    );
                    setValue("image_attributes.photographer", photo.user.name);
                    setValue(
                      "image_attributes.photographer_link",
                      `https://unsplash.com/${photo.user.username}?utm_source=mixie&utm_medium=referral`
                    );
                    setValue("image_attributes.source", "unsplash");
                  }}
                  key={photo.id}
                  className="relative flex aspect-video h-[150px] w-[200px] flex-col items-center justify-center rounded-xl"
                >
                  <Link
                    href={`https://unsplash.com/${photo.user.username}?utm_source=mixie&utm_medium=referral`}
                    className="absolute bottom-0 left-0 bg-gray-700/20 text-step--4 text-white drop-shadow-xl"
                    target="_blank"
                  >
                    {photo.user.name}
                  </Link>
                  <Image
                    src={photo.urls.small}
                    alt={photo.alt_description ?? ""}
                    width={200}
                    height={150}
                    unoptimized
                    className="aspect-video h-full w-full rounded-xl object-cover"
                  />
                </Button>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="max-h-4/5 w-11/12 md:w-1/2" showClose={false}>
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

        <DisplayForm />

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
