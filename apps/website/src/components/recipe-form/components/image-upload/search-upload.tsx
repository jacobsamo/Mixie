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
import Upload from "./user-upload";
import UrlUpload from "./url-upload";
import { cn } from "@/lib/utils";

const api = createApi({
  accessKey: env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});
const SearchUpload = () => {
  const [unsplashImageSearch, setUnsplashImageSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data: searchedPhotos, refetch: refetchImages } = useQuery({
    queryKey: ["image_search"],
    queryFn: async () => {
      const { response, errors } = await api.search.getPhotos({
        query: unsplashImageSearch,
        page: page,
      });

      if (errors) console.error(errors);

      return response;
    },
  });

  const { setValue, watch } =
    useFormContext<z.infer<typeof recipeClientFormSchema>>();

  useEffect(() => {
    refetchImages();
  }, [unsplashImageSearch]);

  const imageUrl = watch("image_url");

  return (
    <>
      <Input
        name="unsplashImageSearch"
        placeholder="Search for an image"
        type="search"
        // LeadingIcon={<Search />}
        value={unsplashImageSearch}
        onChange={(e) => setUnsplashImageSearch(e.target.value)}
      />
      <div className="group flex h-full w-full flex-wrap gap-2 overflow-y-auto">
        {searchedPhotos?.results.map((photo) => (
          <Button
            unstyled
            onClick={() => {
              setValue("image_url", photo.urls.regular);
              setValue("image_attributes.alt", photo.alt_description ?? "");
              setValue("image_attributes.photographer", photo.user.name);
              setValue(
                "image_attributes.photographer_link",
                `https://unsplash.com/${photo.user.username}?utm_source=mixie&utm_medium=referral`
              );
              setValue("image_attributes.source", "unsplash");
            }}
            key={photo.id}
            className={cn(
              "relative flex aspect-video h-[150px] w-[200px] flex-col items-center justify-center rounded-xl",
              {
                "ring-2 ring-ring ring-offset-2":
                  photo.urls.regular === imageUrl,
                "opacity-80": photo.urls.regular !== imageUrl,
              }
            )}
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
        {searchedPhotos && (
          <>
            <Button
              type="button"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev page
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next page
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default SearchUpload;
