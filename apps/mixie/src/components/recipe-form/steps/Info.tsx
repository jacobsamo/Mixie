import { submitInfo } from "@/actions/recipe-form/submit-info";
import { infoSchema } from "@/actions/schema";
import { Input } from "@/components/ui/advanced-components/input";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { useStepper } from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { SharedProps, StepperFormActions } from "./shared";

export interface InfoProps extends SharedProps {}

const Info = () => {
  const { nextStep } = useStepper();

  const setInfo = useAction(submitInfo, {
    onError: () => {
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: () => {
      nextStep();
    },
  });

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
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
      <Input
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
      />
      <Input
        {...register("yield", { valueAsNumber: true })}
        error={errors.yield}
        label="Serves"
        type="number"
      />

      <StepperFormActions isSubmitting={isSubmitting} />
    </form>
  );
};

export default Info;
