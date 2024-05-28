import { submitInfo } from "@/actions/recipe-form/submit-info";
import { infoSchema } from "@/actions/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { InlineInput } from "@/components/ui/inline-input";
import { Input } from "@/components/ui/input";
import { useStepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { Recipe } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRecipeContext } from "../recipe-form-provider";
import { StepperFormActions } from "./shared";
import ImageUpload from "../components/image-upload";

const Info = () => {
  const { nextStep } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();

  const setInfo = useAction(submitInfo, {
    onError: (e) => {
      console.error("Error setting info: ", e);
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: (data: Recipe) => {
      setRecipe(data);
      nextStep();
    },
  });

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      ...recipe,
    },
  });

  const {
    formState: {errors, isDirty },
    control,
    handleSubmit
  } = form;

  const isSubmitting =
    setInfo.status !== "idle" && setInfo.status !== "hasErrored";

  const onSubmit: SubmitHandler<z.infer<typeof infoSchema>> = (data) => {
    if (isDirty) {
      setInfo.execute(data);
    } else {
      nextStep();
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-2 md:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name</FormLabel>
              <FormControl className="flex">
                <Input id="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl className="flex">
                <Textarea id="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl className="flex">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="prep_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prep time</FormLabel>
              <FormControl className="flex">
                <InlineInput endText="minutes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cook_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cook time</FormLabel>
              <FormControl className="flex">
                <InlineInput endText="minutes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="yield"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serves</FormLabel>
              <FormControl className="flex">
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload />

        <StepperFormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default Info;
