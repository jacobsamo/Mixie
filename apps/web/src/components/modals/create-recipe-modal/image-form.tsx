import { CreateRecipeSchema } from "@/lib/utils/recipe-imports";
import { Upload } from "lucide-react";
import Dropzone from "react-dropzone";
import { useFormContext } from "react-hook-form";
import heicConvert from "heic-convert/browser";

interface ImageFormProps {
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageForm = ({ uploadedImage, setUploadedImage }: ImageFormProps) => {
  const form = useFormContext<CreateRecipeSchema>();

  const convertToJpg = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0);
          const jpgDataUrl = canvas.toDataURL("image/jpeg");
          resolve(jpgDataUrl);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (file: File) => {
    try {
      let convertedFile = file;

      console.log("convertedFile: ", {
        type: convertedFile.type,
        name: convertedFile.name,
        size: convertedFile.size,
        file: convertedFile,
      });
      // Handle HEIC format
      if (
        file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.type === "image/heif" ||
        file.name.toLowerCase().endsWith(".heif")
      ) {
        const blob = await heicConvert({
          buffer: await file.arrayBuffer(),
          format: "JPEG",
        });
        convertedFile = new File(
          [blob],
          file.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );
      }

      // For other formats, convert to JPG
      const jpgDataUrl = await convertToJpg(convertedFile);
      form.setValue("image", jpgDataUrl, {
        shouldDirty: true,
        shouldTouch: true,
      });
      console.log("jpgDataUrl: ", jpgDataUrl);
      setUploadedImage(jpgDataUrl);
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <Dropzone
        onDrop={(acceptedFiles: File[]) => {
          handleFileChange(acceptedFiles[0]!);
        }}
        maxFiles={1}
        maxSize={1024 * 1024 * 3}
        // accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-700 hover:bg-gray-600"
          >
            {!uploadedImage && (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Upload className="mb-3 h-10 w-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG</p>
                <p className="text-xs text-gray-400">Max size 3mb</p>
              </div>
            )}
            {uploadedImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={uploadedImage}
                alt="uploaded image"
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
