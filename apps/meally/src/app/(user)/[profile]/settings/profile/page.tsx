"use client";
import { env } from "@/env.mjs";
import { Button } from "@/src/common/components/ui/button";
import { Input } from "@/src/common/components/ui/input";
import { User } from "@/src/server/db/types";
import { userSchema } from "@/src/server/db/zodSchemas";
import ImageUploadDialog from "@components/elements/ImageUploadDialog";
import { DialogTrigger } from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UploadFileResponse } from "uploadthing/client";

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  const methods = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...user,
    },
  });

  const { handleSubmit, register, control, setValue, watch } = methods;

  useEffect(() => {
    if (!user) {
      fetch(`/api/users/${params.profile}`, {
        headers: {
          authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      }).then(async (res) => {
        if (res.status !== 200) {
          setLoading(false);
          return;
        }
        const user = (await res.json()) as User;

        Object.keys(user).forEach((key: keyof User) => {
          setValue(key, user[key]);
        });
        setUser(user);
        setLoading(false);
      });
    }
  }, []);

  const setImages = (images: UploadFileResponse[]) => {
    setUploadLoading(true);
    const image = images[0];
    setValue("image", image.url);
    setUploadLoading(false);
  };

  return (
    <>
      {loading && <Loader2 className="m-auto h-8 w-8 animate-spin" />}
      {!loading && (
        <form
          className="mx-auto mt-2 flex w-full flex-col items-start  justify-center  gap-4 rounded-md bg-white p-2 shadow-main  dark:bg-grey md:w-2/4 md:p-4"
          onSubmit={handleSubmit(async (data: User) => {
            console.log("User data", data);
            await fetch(`/api/users/${params.profile}`, {
              method: "PUT",
              headers: {
                authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
              },
              body: JSON.stringify(data),
            });
          })}
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
                      src={user?.image || ""}
                      alt={user?.name || "Profile picture"}
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
            defaultValue={user?.bio || ""}
          />
          <Button
            type="submit"
            variant="primary"
            ariaLabel="Save profile changes"
            className="m-auto mt-12"
          >
            Save
          </Button>
          {/* <div className="flex flex-col gap-2">
          <h1 className="text-step--1">Profile Social</h1>
          <Input
            id="twitter"
            name="Twitter"
            label="Twitter"
            control={control}
            defaultValue={user.socials?.Twitter}
          />
          <Input
            id="instagram"
            name="Instagram"
            label="Instagram"
            control={control}
            defaultValue={user.socials?.Instagram}
          />
          <Input
            id="facebook"
            name="Facebook"
            label="Facebook"
            control={control}
            defaultValue={user.socials?.Facebook}
          />
          <Input
            id="website"
            name="Website"
            label="Website"
            control={control}
            defaultValue={user.socials?.Website}
          />
        </div> */}
        </form>
      )}
    </>
  );
}
