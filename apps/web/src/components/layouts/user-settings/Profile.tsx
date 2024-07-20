import ImageUploadDialog from "@/components/modals/image-upload-modal";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/advanced-components/input";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { profileEditSchema } from "@/types/zodSchemas/profile";
import { z } from "zod";

const Profile = () => {
  const { getValues, register, setValue, control } =
    useFormContext<z.infer<typeof profileEditSchema>>();

  const setImages = (image: string) => {
    setValue("profile_picture", image);
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <ImageUploadDialog
          title="Edit Profile Picture"
          description="upload a new profile picture"
          setImage={setImages}
          Trigger={
            <DialogTrigger asChild>
              <Button
                aria-label="edit or upload an image"
                variant={"secondary"}
                type="button"
                unstyled={true}
              >
                <Image
                  src={getValues("profile_picture") || ""}
                  alt={getValues("user_name") || "Profile picture"}
                  width={100}
                  height={100}
                  priority
                  className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
                />
              </Button>
            </DialogTrigger>
          }
        >
          <div>
            <div className="flex items-center">
              <div className="w-1/2 border-t border-grey dark:border-white"></div>
              <span className="mx-2">OR</span>
              <div className="w-1/2 border-b border-grey dark:border-white"></div>
            </div>
            <Input
              {...register("profile_picture", {
                required: true,
              })}
              required
              label="Image Url"
              placeholder="https://"
            />
          </div>
        </ImageUploadDialog>

        <div className="flex flex-col gap-2">
          <Input
            id="displayName"
            label="Name"
            {...register("first_name", { required: true })}
          />
          <Input
            id="userName"
            label="User Name"
            {...register("user_name", { required: true })}
          />
        </div>
      </div>

      <Textarea
        id="bio"
        label="Bio"
        control={control}
        defaultValue={getValues("bio") || ""}
      />
    </div>
  );
};

export default Profile;
