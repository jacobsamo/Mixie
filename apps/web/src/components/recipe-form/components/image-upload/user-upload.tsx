"use client";
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
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const Upload = () => {
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
    setValue("image_url", image, { shouldDirty: true, shouldTouch: true });
    setValue("image_attributes.source", "upload", {
      shouldDirty: true,
      shouldTouch: true,
    });
    // setLoading(false);
  };

  return (
    <>
      <UploadDropzone
        className=""
        appearance={{
          container: "cursor-pointer",
          button: "bg-secondary text-secondary-foreground",
        }}
        endpoint="imageUploader"
        // onUploadBegin={() => setLoading(true)}
        onClientUploadComplete={(res) => {
          // Do something with the response
          res && res[0] && setImages(res[0].serverData.url);

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
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>A short description of the image</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Upload;
