import { submitSteps } from "@/actions/recipe-form/submit-steps";
import { stepsSchema } from "@/actions/schema";
import { DraggableContainer, DraggableItem } from "@/components/dragable";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { Recipe } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Step } from "../components/step";
import { useRecipeContext } from "../recipe-form-provider";
import { StepperFormActions } from "./shared";

const Steps = () => {
  const { nextStep } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();

  const form = useForm<z.infer<typeof stepsSchema>>({
    resolver: zodResolver(stepsSchema),
    defaultValues: {
      recipe_id: recipe?.recipe_id ?? undefined,
      steps: recipe?.steps ?? [
        {
          text: "",
        },
      ],
    },
  });

  const {
    register,
    formState: { isDirty },
    control,
    handleSubmit,
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: "steps",
  });

  const setSteps = useAction(submitSteps, {
    onError: () => {
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: ({ data }) => {
      if (!data) return;
      setRecipe(data as Recipe);
      nextStep();
    },
  });

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({ text: "" });
  }, [append]);

  const handleSwap = useCallback(
    (drop: DropResult) => {
      if (drop.destination == null) return;
      const sourceIndex = drop.source.index;
      const targetIndex = drop.destination.index;

      move(sourceIndex, targetIndex);
    },
    [move]
  );

  const isSubmitting =
    setSteps.status !== "idle" && setSteps.status !== "hasErrored";

  const onSubmit = (data: z.infer<typeof stepsSchema>) => {
    if (isDirty) {
      setSteps.execute(data);
    } else {
      nextStep();
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
        <section className="flex w-full flex-col gap-2">
          <DraggableContainer droppableId="steps" onDragEnd={handleSwap}>
            {fields.map((field, index: number) => {
              return (
                <DraggableItem index={index} id={field.id} key={field.id}>
                  <Step
                    index={index}
                    handleDelete={handleDelete}
                    key={field.id}
                  />
                </DraggableItem>
              );
            })}
          </DraggableContainer>
          <Button
            aria-label="Add an Step"
            className="mt-3 flex h-9 flex-row items-center gap-2 rounded-xl border text-step--2"
            onClick={() => handleAddClick()}
            name="Ingredient"
            type="button"
            variant={"outline"}
          >
            <PlusCircleIcon className="h-5 w-5" />
            Add Step
          </Button>
        </section>
        <StepperFormActions isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};

export default Steps;
