import { Input } from "@components/ui/input";
import { recipeFormSchema } from "@db/zodSchemas";
import { UploadDropzone } from "@lib/utils/uploadthing";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const ImageUpload = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<z.infer<typeof recipeFormSchema>>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errors.imgUrl || errors.imgAlt) {
      setOpen(true);
    }
  }, []);

  const setImages = (image: string) => {
    setLoading(true);
    setValue("imgUrl", image);
    setLoading(false);
  };

  return (
    <div className="my-8 aspect-video max-h-[600px] max-w-[880px] rounded-xl border p-4">
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
          error={errors.imgUrl}
          label="Image Url"
          placeholder="https://"
        />
        <Input
          {...register("imgAlt", {
            required: true,
          })}
          error={errors.imgAlt}
          label="Img Alt Text"
          tooltip="A short description of the image, this helps people with screen readers to understand the image"
          hint="A short description of the image"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
