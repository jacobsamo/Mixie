import { submitIngredients } from "@/actions/recipe-form/submit-ingredients";
import { ingredientsSchema } from "@/actions/schema";
import { DraggableContainer, DraggableItem } from "@/components/dragable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
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
import { Recipe } from "@/types";

const Ingredients = () => {
  const { nextStep } = useStepper();
  const { recipe, setRecipe } = useRecipeContext();

  const form = useForm<z.infer<typeof ingredientsSchema>>({
    resolver: zodResolver(ingredientsSchema),
    defaultValues: {
      recipe_id: recipe?.recipe_id ?? undefined,
      ingredients: recipe?.ingredients ?? [
        {
          text: "",
        },
        {
          text: "",
        },
      ],
    },
  });

  const {
    register,
    formState: { errors, isDirty },
    control,
    handleSubmit,
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: "ingredients",
  });

  const setIngredients = useAction(submitIngredients, {
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

  const handleHeadingClick = useCallback(() => {
    append({ text: "", isHeading: true });
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
    setIngredients.status !== "idle" && setIngredients.status !== "hasErrored";

  const onSubmit = (data: z.infer<typeof ingredientsSchema>) => {
    if (isDirty) {
      setIngredients.execute(data);
    } else {
      nextStep();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-8 md:w-1/2"
      >
        <section className="flex w-full flex-col gap-2">
          <DraggableContainer droppableId="steps" onDragEnd={handleSwap}>
            {fields.map((field, index: number) => {
              return (
                <DraggableItem index={index} id={field.id} key={field.id}>
                  <div className="mt-4 inline-flex w-full items-center gap-2">
                    <GripVertical />

                    <Input
                      {...register(`ingredients.${index}.text`)}
                      placeholder={
                        field.isHeading ? "Heading..." : "Ingredient"
                      }
                      className="h-12"
                    />

                    <Button
                      aria-label="delete ingredient"
                      onClick={() => handleDelete(index)}
                      type="button"
                      className="group rounded-md border border-solid border-red bg-transparent hover:bg-red"
                      size="icon"
                    >
                      <Trash2Icon className="h-6 w-6 text-red group-hover:text-white" />
                    </Button>
                  </div>
                </DraggableItem>
              );
            })}
          </DraggableContainer>

          <button
            type="button"
            onClick={() => handleHeadingClick()}
            className="mt-0 text-step--3"
          >
            Add Heading
          </button>
          <Button
            aria-label="Add an ingredient"
            className="mt-3 flex h-9 flex-row items-center gap-2 rounded-xl border text-step--2"
            onClick={() => handleAddClick()}
            name="Ingredient"
            type="button"
            variant={"secondary"}
          >
            <PlusCircleIcon className="h-5 w-5" />
            Add Ingredient
          </Button>
        </section>

        <StepperFormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default Ingredients;
