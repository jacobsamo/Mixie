import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { recipeFormSchema } from "@/types/zodSchemas";
import { env } from "env";
import { Edit2, LinkIcon, PlusCircleIcon, Search, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/src/methods/search/types/response";
import * as z from "zod";
import { Button } from "../../ui/button";

const api = createApi({
  accessKey: env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const ImageUpload = () => {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<z.infer<typeof recipeFormSchema>>();
  const [loading, setLoading] = useState(false);
  const [unsplashImageSearch, setUnsplashImageSearch] = useState("");
  const [data, setPhotosResponse] = useState<Photos | undefined>(undefined);

  const setImages = (image: string) => {
    setLoading(true);
    setValue("imageUrl", image);
    setValue("imageAttributes.source", "upload");
    setLoading(false);
  };

  useEffect(() => {
    api.search
      .getPhotos({ query: unsplashImageSearch })
      .then((result) => {
        setPhotosResponse(result.response);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [unsplashImageSearch]);

  const image = watch("imageUrl");
  const imageAttributes = watch("imageAttributes");

  return (
    <div
      className={cn(
        "group relative my-8 aspect-video max-h-[600px] max-w-[880px] resize rounded-xl border p-2",
        {
          "border-red shadow shadow-red":
            errors.imageUrl || errors.imageAttributes?.alt,
        }
      )}
    >
      {image && (
        <>
          <Image
            src={image ?? "/images/placeholder.webp"}
            alt={imageAttributes?.alt ?? ""}
            placeholder="blur"
            blurDataURL={image ?? "/images/placeholder.webp"}
            width={800}
            height={600}
            priority
            className="aspect-video h-full w-full rounded-xl object-cover"
          />
          {imageAttributes?.photographer &&
            imageAttributes.photographerLink && (
              <div className="textOnBackground absolute bottom-2 left-2 bg-gray-700/20 text-white drop-shadow-xl">
                Photo by{" "}
                <Link
                  href={imageAttributes.photographerLink}
                  target="_blank"
                  className="underline underline-offset-2"
                >
                  {imageAttributes.photographer}
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
            "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2",
            {
              "opacity-30 group-hover:opacity-100": image,
              "rounded-xl bg-red p-2 text-white ":
                errors.imageUrl || errors.imageAttributes?.alt,
            }
          )}
        >
          <p>{errors.imageUrl?.message}</p>

          {image ? (
            <div className="flex flex-row gap-2">
              <Edit2 /> Edit Image
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <PlusCircleIcon /> Add an Image
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="h-4/5 w-11/12 overflow-scroll md:w-1/2">
          <Tabs defaultValue="unsplash" className="h-full w-full">
            <TabsList className="w-11/12 justify-between ">
              <TabsTrigger value="unsplash" className="flex flex-row gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  version="1.1"
                  aria-labelledby="unsplash-home"
                  aria-hidden="false"
                  className="dark:fill-white"
                >
                  <desc lang="en-US">Unsplash logo</desc>
                  <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
                </svg>
                Unsplash
              </TabsTrigger>
              <TabsTrigger value="url" className="flex flex-row gap-2">
                <LinkIcon /> URL
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex flex-row gap-2">
                <Upload /> Upload
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unsplash">
              <Input
                // label="Search"
                name="unsplashImageSearch"
                placeholder="Search for an image"
                type="search"
                LeadingIcon={<Search />}
                value={unsplashImageSearch}
                onChange={(e) => setUnsplashImageSearch(e.target.value)}
              />
              <div className="group flex h-fit w-full flex-wrap gap-2">
                {data?.results.map((photo) => (
                  <Button
                    unstyled
                    onClick={() => {
                      setValue("imageUrl", photo.urls.regular);
                      setValue(
                        "imageAttributes.alt",
                        photo.alt_description ?? ""
                      );
                      setValue("imageAttributes.photographer", photo.user.name);
                      setValue(
                        "imageAttributes.photographerLink",
                        `https://unsplash.com/${photo.user.username}?utm_source=mixie&utm_medium=referral`
                      );
                      setValue("imageAttributes.source", "unsplash");
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
                      className="aspect-video h-full w-full rounded-xl object-cover"
                    />
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="url" className="flex flex-col gap-2">
              <Input
                {...register("imageUrl", {
                  required: true,
                })}
                required
                error={errors.imageUrl}
                label="Image Url"
                placeholder="https://"
              />
              <Input
                {...register("imageAttributes.alt", {
                  required: true,
                })}
                required
                error={errors.imageAttributes?.alt}
                label="Img Alt Text"
                tooltip="A short description of the image, this helps people with screen readers to understand the image"
                hint="A short description of the image"
              />
            </TabsContent>
            <TabsContent value="upload" className="flex flex-col gap-2">
              <UploadDropzone
                className=""
                appearance={{
                  container: "border border-white",
                }}
                endpoint="imageUploader"
                onUploadBegin={() => setLoading(true)}
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  res && setImages(res[0].url);

                  setLoading(false);
                  toast.success("Image uploaded!");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  setLoading(false);
                  toast.error("Error uploading image");
                  console.error(error);
                }}
              />
              <Input
                {...register("imageAttributes.alt", {
                  required: true,
                })}
                required
                error={errors.imageAttributes?.alt}
                label="Img Alt Text"
                tooltip="A short description of the image, this helps people with screen readers to understand the image"
                hint="A short description of the image"
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="sticky bottom-0 right-1 flex flex-row gap-2">
            <DialogClose>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button type="button">Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
