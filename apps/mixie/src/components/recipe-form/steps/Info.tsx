import { submitInfo } from "@/actions/recipe-form/submit-info";
import { infoSchema } from "@/actions/schema";
// import { Input } from "@/components/ui/advanced-components/input";
import { Input } from "@/components/ui/input";
import { InlineInput } from "@/components/ui/inline-input";
import { Textarea } from "@/components/ui/textarea";
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

  const isSubmitting =
    setInfo.status !== "idle" && setInfo.status !== "hasErrored";

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2 w-full md:w-1/2" 
        onSubmit={form.handleSubmit(setInfo.execute)}
      >
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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

        <FormField
          control={form.control}
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

        <StepperFormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default Info;
