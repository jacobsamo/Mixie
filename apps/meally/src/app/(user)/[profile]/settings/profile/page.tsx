"use client";
import { env } from "@/env.mjs";
import { Button } from "@/src/common/components/ui/button";
import { Input } from "@/src/common/components/ui/input";
import { toast } from "@/src/common/components/ui/use-toast";
import { User } from "@/src/server/db/types";
import ImageUploadDialog from "@components/elements/ImageUploadDialog";
import { DialogTrigger } from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadFileResponse } from "uploadthing/client";

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [loading, setLoading] = useState(false);

  const methods = useForm<User>({
    // resolver: zodResolver(userSchema),
    defaultValues: async () => {
      const res = await fetch(`/api/users/${params.profile}`, {
        headers: {
          authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });
      const user = (await res.json()) as User;

      return user;
    },
  });

  const { handleSubmit, register, control, setValue, watch, getValues } =
    methods;

  const setImages = (images: UploadFileResponse[]) => {
    const image = images[0];
    setValue("image", image.url);
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    try {
      setLoading(true);
      fetch(`/api/users/${params.profile}/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          toast({
            title: "Success!",
            description: "Your profile has been updated",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was an error while updating your profile",
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="mx-auto mt-2 flex w-full flex-col items-start  justify-center  gap-4 rounded-md bg-white p-2 shadow-main  dark:bg-grey md:w-2/4 md:p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center gap-2">
          <ImageUploadDialog
            title="Edit Profile Picture"
            description="upload a new profile picture"
            setImage={setImages}
            Trigger={
              <DialogTrigger asChild>
                <Button
                  ariaLabel="edit or upload an image"
                  variant={"secondary"}
                  type="button"
                  unstyled={true}
                >
                  <Image
                    src={getValues("image") || ""}
                    alt={getValues("userName") || "Profile picture"}
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
                {...register("image", {
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
              {...register("name", { required: true })}
            />
            <Input
              id="userName"
              label="User Name"
              {...register("userName", { required: true })}
            />
          </div>
        </div>

        <Textarea
          id="bio"
          label="Bio"
          control={control}
          defaultValue={getValues("bio") || ""}
        />
        <Button
          type="submit"
          variant="primary"
          ariaLabel="Save profile changes"
          className="m-auto mt-12"
          disabled={loading}
        >
          Save
          {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </>
  );
}
