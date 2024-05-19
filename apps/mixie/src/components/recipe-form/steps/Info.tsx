import { submitInfo } from "@/actions/recipe-form/submit-info";
import { infoSchema } from "@/actions/schema";
// import { Input } from "@/components/ui/advanced-components/input";
import { Input } from "@/components/ui/input";
import { InlineInput } from "@/components/ui/inline-input";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { useStepper } from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRecipeContext } from "../recipe-form-provider";
import { StepperFormActions } from "./shared";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  useFormField,
} from "@/components/ui/form";

const Info = () => {
  const { nextStep } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();

  const setInfo = useAction(submitInfo, {
    onError: (e) => {
      console.error("Error setting info: ", e);
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: (data) => {
      setRecipe(data);
      nextStep();
    },
  });

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      recipe_id: recipe?.recipe_id ?? undefined,
      image_attributes: recipe?.image_attributes ?? null,
      image_url: recipe?.image_url ?? null,
      title: recipe?.title ?? undefined,
      description: recipe?.description ?? null,
      source: recipe?.source ?? null,
      prep_time: recipe?.prep_time ?? null,
      cook_time: recipe?.cook_time ?? null,
      yield: recipe?.yield ?? null,
    },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const isSubmitting =
    setInfo.status !== "idle" && setInfo.status !== "hasErrored";

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(setInfo.execute)}
      >
        <Input
          {...register("title", {
            required: true,
          })}
          error={errors.title}
          required
          label="Recipe name"
        />
        <Textarea id="description" label="Description" control={control} />
        <Input
          {...register("source")}
          label="Source"
          tooltip="Where you got the recipe from if you got it from another website"
        />
        <Input
          {...register("prep_time", {
            pattern: {
              value: /^(\d{1,2}[hms]\s?)+$/i,
              message:
                "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
            },
          })}
          error={errors.prep_time}
          label="Prep Time"
          hint="Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds"
        />
        {/* <Input
        {...register("cook_time", {
          pattern: {
            value: /^(\d{1,2}[hms]\s?)+$/i,
            message:
              "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
          },
        })}
        error={errors.cook_time}
        label="Cook Time"
        hint="Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds"
      /> */}
        <InlineInput {...register("cook_time")} endText="minutes" />

        <FormField
          control={form.control}
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

        <Input
          {...register("yield", { valueAsNumber: true })}
          error={errors.yield}
          label="Serves"
          type="number"
        />

        <FormField
          control={form.control}
          name="yield"
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

        <StepperFormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default Info;
