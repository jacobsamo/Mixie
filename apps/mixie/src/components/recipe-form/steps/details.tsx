"use client";

import { submitDetails } from "@/actions/recipe-form/submit-details";
import { detailsSchema } from "@/actions/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const Details = () => {
  const setDetails = useAction(submitDetails, {
    onError: () => {
      toast.error("Something went wrong pleaase try again.");
    },
  });

  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
  });

  const isSubmitting =
    setDetails.status !== "idle" && setDetails.status !== "hasErrored";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(setDetails.execute)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Textarea placeholder="Placeholder" {...field} />
              </FormControl>
              <FormDescription>Placeholder</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Details;
