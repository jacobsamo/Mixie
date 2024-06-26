import { CreateRecipeSchema } from "@/lib/utils/recipe-imports";
import { Upload } from "lucide-react";
import Dropzone from "react-dropzone";
import { useFormContext } from "react-hook-form";

interface ImageFormProps {
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageForm = ({ uploadedImage, setUploadedImage }: ImageFormProps) => {
  const form = useFormContext<CreateRecipeSchema>();

  const handleFileChange = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      form.setValue(
        "image",
        reader.result
          ?.toString()
          .replace(/^data:image\/[a-z]+;base64,/, "") as string
      );
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Dropzone
        onDrop={(acceptedFiles) => {
          handleFileChange(acceptedFiles[0]);
        }}
        maxFiles={1}
        maxSize={1024 * 1024 * 3}
        accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-700 hover:bg-gray-600"
          >
            {!uploadedImage && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="mb-3 h-10 w-10 text-gray-400" />
                <p className="mb-2 text-gray-400 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-gray-400 text-xs">PNG, JPG</p>
                <p className="text-gray-400 text-xs">Max size 3mb</p>
              </div>
            )}
            {uploadedImage && (
              <img
                src={uploadedImage}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default ImageForm;
