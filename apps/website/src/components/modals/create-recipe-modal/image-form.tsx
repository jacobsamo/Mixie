import React from "react";
import { useForm } from "react-hook-form";
import { createRecipeFromImage, schema } from "@/actions/recipe-imports/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import Dropzone from "react-dropzone";

const ImageForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const createRecipe = useAction(createRecipeFromImage, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create recipe");
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        form.setValue("image", reader.result?.toString() as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    const image = data.image.replace(/^data:image\/[a-z]+;base64,/, "");

    createRecipe.execute({image: image});
  };

  const base64Image = form.watch("image");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="image" className="mb-2 block font-medium">
          Image
        </label>
        <div className="flex w-full items-center justify-center">
          <Dropzone
            onDrop={(acceptedFiles) => console.log(acceptedFiles)}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-700 hover:bg-gray-600"
                >
                  {!base64Image && (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-3 h-10 w-10 text-gray-400" />
                      <p className="mb-2 text-gray-400 text-sm">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-gray-400 text-xs">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  {base64Image && (
                    <img
                      src={base64Image}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  )}
                  <input {...getInputProps()} />
                </div>
              </section>
            )}
          </Dropzone>
          <label
            htmlFor="image"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-700 hover:bg-gray-600"
          >
            {!base64Image && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {/* <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg> */}
                <Upload className="mb-3 h-10 w-10 text-gray-400" />
                <p className="mb-2 text-gray-400 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-gray-400 text-xs">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            {base64Image && (
              <img
                src={base64Image}
                className="h-64 w-full object-cover rounded-lg"
              />
            )}
            <input
              id="image"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button type="submit">Create Recipe</Button>
      </DialogFooter>
    </form>
  );
};

export default ImageForm;
