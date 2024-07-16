import { submitInfo } from "@/actions/recipe-form/submit-info";
import { infoSchema } from "@/actions/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import NumberInput from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

const Info = () => {
  const { nextStep } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();

  const setInfo = useAction(submitInfo, {
    onError: (e) => {
      console.error("Error setting info: ", e);
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: ({data}) => {
      if (!data) return;
      setRecipe(data as Recipe);
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
    formState: { isDirty },
    control,
    setValue,
    handleSubmit,
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
                <Input
                  id="description"
                  {...field}
                  value={field.value ?? undefined}
                />
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
              <FormLabel>Description</FormLabel>
              <FormControl className="flex">
                <Textarea
                  id="description"
                  {...field}
                  value={field.value ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload />

        <FormField
          control={control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl className="flex">
                <Input
                  {...field}
                  value={field.value ?? undefined}
                  placeholder="https://"
                />
              </FormControl>
              <FormDescription>The url of the recipe source</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="prep_time"
          rules={{ pattern: /[0-9]*/ }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prep time</FormLabel>
              <FormControl className="flex">
                <InlineInput
                  endText="minutes"
                  type="number"
                  inputMode="numeric"
                  className="no-number-stepper"
                  value={field.value ? Number(field.value) : undefined}
                  onChange={(e) =>
                    field.onChange(
                      e.target?.value ? Number(e.target.value) : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cook_time"
          rules={{ pattern: /[0-9]*/, min: 0 }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cook time</FormLabel>
              <FormControl className="flex">
                <InlineInput
                  endText="minutes"
                  type="number"
                  inputMode="numeric"
                  className="no-number-stepper"
                  value={field.value ? Number(field.value) : undefined}
                  onChange={(e) =>
                    field.onChange(
                      e.target?.value ? Number(e.target.value) : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="yield"
          rules={{ pattern: /[0-9]*/, min: 0 }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serves</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setValue("yield", Number(field.value) - 1)}
                    disabled={Number(field.value) <= 1 ?? true}
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>

                  <Input
                    type="number"
                    inputMode="numeric"
                    className="no-number-stepper"
                    pattern="[0-9]*"
                    min={0}
                    value={field.value ? Number(field.value) : undefined}
                    onChange={(e) =>
                      field.onChange(
                        e.target?.value ? Number(e.target.value) : null
                      )
                    }
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setValue("yield", Number(field.value) + 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                </div>
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
