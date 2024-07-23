"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileEditSchema } from "@/types/zodSchemas/profile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/user/update-user";
import { toast } from "sonner";

const OnboardForm = ({
  profile,
}: {
  profile: z.infer<typeof profileEditSchema>;
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof profileEditSchema>>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      ...profile,
      first_name: profile?.first_name ?? profile?.full_name?.split(" ")[0],
      last_name: profile?.last_name ?? profile?.full_name?.split(" ")[1],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof profileEditSchema>> = async (
    data
  ) => {
    setLoading(true);

    const update = await updateUser(data);

    if (update?.serverError || update?.validationErrors) {
      toast.error("Error while updating profile");
    }

    toast.success("Profile updated successfully");

    setLoading(false);
  };

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);

  useEffect(() => {
    console.log("profile: ", profile);
  }, [profile]);

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel>Full Name</FormLabel>
        <div className="inline-flex items-center gap-2">
          <FormField
            control={control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? undefined}
                    placeholder="First Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? undefined}
                    placeholder="Last Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? undefined}
                  placeholder="User Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (tell us a bit about yourself)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? undefined}
                  placeholder="Bio"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default OnboardForm;
