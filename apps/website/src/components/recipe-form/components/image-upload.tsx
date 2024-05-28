import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/advanced-components/input";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { cn } from "@/lib/utils";
  import { UploadDropzone } from "@/lib/utils/uploadthing";
  import { recipeClientFormSchema } from "@/types/zodSchemas";
  import { env } from "env";
  import { Edit2, LinkIcon, PlusCircleIcon, Search, SearchIcon, Upload, UploadIcon } from "lucide-react";
  import Image from "next/image";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { useFormContext } from "react-hook-form";
  import toast from "react-hot-toast";
  import { createApi } from "unsplash-js";
  import { Photos } from "unsplash-js/src/methods/search/types/response";
  import * as z from "zod";
  import { Button } from "@/components/ui/button";
import { HeaderControls } from "./header-controls";

  type ImageUploadType = "url" | "upload" | "search";

const ImageUpload = () => {
    const [uploadType, setUploadType] = useState<ImageUploadType | null>(null);
    

  return (
    <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button variant="outline">Upload Image</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[480px]">
      <HeaderControls currentStepId={uploadType} goToPreviousStep={() => setUploadType(null)} />
      <DialogHeader>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogDescription>Choose one of the options below to upload your image.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Button className="justify-start gap-2" variant="outline" onClick={() => setUploadType("url")}>
          <LinkIcon className="h-5 w-5" />
          Upload from URL
        </Button>
        <Button className="justify-start gap-2" variant="outline" onClick={() => setUploadType("upload")}>
          <UploadIcon className="h-5 w-5" />
          Upload from File
        </Button>
        <Button className="justify-start gap-2" variant="outline" onClick={() => setUploadType("search")}>
          <SearchIcon className="h-5 w-5" />
          Search for Image
        </Button>
      </div>
      <DialogFooter>
        <Button variant="ghost">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  )
}

export default ImageUpload