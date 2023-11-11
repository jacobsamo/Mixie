"use client";
import { env } from "@/env.mjs";
import { Button } from "@/src/common/components/ui/button";
import { Input } from "@/src/common/components/ui/input";
import { toast } from "@/src/common/components/ui/use-toast";
import { TFont, TTheme } from "@/src/server/db/enum-types";
import { allergens, diet } from "@/src/server/db/schemas/enums";
import { User } from "@/src/server/db/types";
import ImageUploadDialog from "@components/elements/ImageUploadDialog";
import { DialogTrigger } from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadFileResponse } from "uploadthing/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/src/server/db/zodSchemas";

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

const styles = cva(
  "flex items-center gap-2 p-2 max-w-xs dark:outline dark:outline-grey dark:outline-2 dark:bg-grey dark:text-white dark:shadow-none shadow-main bg-white text-black rounded-md",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "h-12 w-28 ",
        lg: "h-12 w-46",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const theme = ["system", "light", "dark"];

const fonts = ["default", "open_dyslexic", "monospace", "serif", "sans_serif"];

export default function ProfilePage({ params }: ProfilePageProps) {
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("activeLink") || "profile";
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: async () => {
      const res = await fetch(`/api/users/${params.profile}`, {
        headers: {
          authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });
      const user = (await res.json()) as User;
      if (user.emailVerified) user.emailVerified = new Date(user.emailVerified);
      console.log(user);
      return user;
    },
  });

  useEffect(() => {
    if (errors)
      console.log("Errors: ", {
        errors: errors,
        values: getValues(),
      });
  }, [errors]);

  const setImages = (images: UploadFileResponse[]) => {
    const image = images[0];
    setValue("image", image.url);
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
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
            description:
              "Your profile has been updated, changes will be reflected within the hour",
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

  const handleCheckboxChange = (event: any, name: any) => {
    const diet = event.target.value;
    const values = getValues(name);

    // If the checkbox is checked, add the item to the list.
    if (event.target.checked) {
      values.push(diet);
    } else {
      // If the checkbox is unchecked, remove the item from the list.
      const index = values.indexOf(diet);
      if (index > -1) {
        values.splice(index, 1);
      }
    }

    setValue(name, values);
  };

  const values = getValues();
  return (
    <>
      <form
        className="mx-auto mt-2 flex w-full flex-col items-start  justify-center  gap-4 rounded-md bg-white p-2 shadow-main  dark:bg-grey md:w-2/4 md:p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {!values.email && <Loader2 className="m-auto h-16 w-16 animate-spin" />}
        {values.email && (
          <>
            {activeLink == "profile" && (
              <>
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
              </>
            )}

            {activeLink == "customization" && (
              <div>
                <div>
                  <h2 className="my-2 text-step0">Theme</h2>
                  <div className="flex flex-auto flex-wrap gap-2">
                    {theme.map((theme, index) => (
                      <label key={index} className={styles({ size: "md" })}>
                        <input
                          key={theme}
                          type="radio"
                          {...register("theme")}
                          value={theme}
                          defaultChecked={getValues("theme") == theme}
                          onChange={() => {
                            setValue("theme", theme as TTheme);
                          }}
                          className="h-4 w-4"
                        />
                        <p className="text-step--2">{theme}</p>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="my-2 text-step0">Reading Font</h2>
                  <div className="flex flex-auto flex-wrap gap-2">
                    {fonts.map((font, index) => (
                      <label key={index} className={styles({ size: "lg" })}>
                        <input
                          key={font}
                          type="radio"
                          {...register("font")}
                          value={font}
                          defaultChecked={getValues("font") == font}
                          onChange={() => {
                            setValue("font", font as TFont);
                          }}
                          className="h-4 w-4"
                        />
                        <p className="text-step--2">{font}</p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
          </>
        )}
      </form>
    </>
  );
}
