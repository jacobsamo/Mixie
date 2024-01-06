import { env } from "@/env.mjs";
import { cn } from "@/src/common/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Tabs,  TabsList, TabsContent, TabsTrigger} from "@/src/common/components/ui/tabs";
import { recipeFormSchema } from "@db/zodSchemas";
import { UploadDropzone } from "@lib/utils/uploadthing";
import { Edit2, LinkIcon, PlusCircleIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/src/methods/search/types/response";
import * as z from "zod";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";

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
    setValue("imgUrl", image);
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

  const image = watch("imgUrl");
  const imageAlt = watch("imageAttributes.alt");

  return (
    <div
      className={cn(
        "rounded-xl group my-8 aspect-video max-h-[600px] max-w-[880px] resize border p-4",
        {
          "border-red shadow shadow-red":
            errors.imgUrl || errors.imageAttributes?.alt,
        }
      )}
    >
      {getValues("imgUrl") && (
        <Image
          src={image ?? "/images/placeholder.webp"}
          alt={imageAlt ?? ""}
          placeholder="blur"
          blurDataURL={image ?? "/images/placeholder.webp"}
          width={800}
          height={600}
          priority
          className="rounded-xl aspect-video h-full w-full object-cover"
        />
      )}

      <Dialog>
        <DialogTrigger
          className={cn(
            "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2",
            {
              "opacity-30 group-hover:opacity-100": image,
              "rounded-xl bg-red p-2 text-white ":
                errors.imgUrl || errors.imageAttributes?.alt,
            }
          )}
        >
          <p>{errors.imgUrl?.message}</p>

          {image ? (
            <p className="flex flex-row gap-2">
              <Edit2 /> Edit Image
            </p>
          ) : (
            <p className="flex flex-row gap-2">
              <PlusCircleIcon /> Add an Image
            </p>
          )}
        </DialogTrigger>
        <DialogContent className="h-4/5 w-11/12 md:w-1/2">
          <Tabs defaultValue="unsplash" className="w-full">
            <TabsList>
              <TabsTrigger value="unsplash">
                <div className="flex flex-row gap-1">
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
                </div>
              </TabsTrigger>
              <TabsTrigger value="url">
                <div className="flex flex-row gap-2">
                  <LinkIcon /> URL
                </div>
              </TabsTrigger>
              <TabsTrigger value="upload">
                <div className="flex flex-row gap-2">
                  <Upload /> Upload
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unsplash">
              <div>
                <Input
                  // label="Search"
                  name="unsplashImageSearch"
                  placeholder="Search for an image"
                  type="search"
                  LeadingIcon={<Search />}
                  value={unsplashImageSearch}
                  onChange={(e) => setUnsplashImageSearch(e.target.value)}
                />
                <div className="flex w-full flex-wrap gap-2 overflow-scroll">
                  {data?.results.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative flex flex-col items-center justify-center"
                    >
                      <Button
                        unstyled
                        onClick={() => {
                          setValue("imgUrl", photo.urls.regular);
                          setValue(
                            "imageAttributes.alt",
                            photo.alt_description ?? ""
                          );
                          setValue(
                            "imageAttributes.photographer",
                            photo.user.name
                          );
                          setValue(
                            "imageAttributes.photographerLink",
                            photo.user.portfolio_url ??
                              photo.user.links.portfolio
                          );
                        }}
                      >
                        <Image
                          src={photo.urls.small}
                          alt={photo.alt_description ?? ""}
                          width={200}
                          height={200}
                          className="rounded-xl h-52 w-52 object-cover"
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="url">
              <div>
                <div className="flex items-center">
                  <div className="w-1/2 border-t border-grey dark:border-white"></div>
                  <span className="mx-2">OR</span>
                  <div className="w-1/2 border-b border-grey dark:border-white"></div>
                </div>
                <Input
                  {...register("imgUrl", {
                    required: true,
                  })}
                  required
                  error={errors.imgUrl}
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
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <UploadDropzone
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
            </TabsContent>
          </Tabs>

          <DialogFooter>
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
