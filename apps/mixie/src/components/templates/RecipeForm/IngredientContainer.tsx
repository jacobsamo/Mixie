import { Button } from "@/components/ui/button";
import { recipeFormSchema } from "@/types/zodSchemas";
import { PlusCircleIcon } from "lucide-react";
import { useCallback } from "react";
import { type DropResult } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import DraggableContainer from "./Dragablecontainer";
import DraggableItem from "./DraggableItem";
import { Ingredient } from "./Ingredient";

const IngredientContainer = () => {
  const { control, register, formState } =
    useFormContext<z.infer<typeof recipeFormSchema>>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({
      title: "",
      unit: {
        label: "grams",
        value: "grams",
      },
      quantity: null,
      isHeading: false,
      amount: null,
    });
  }, [append]);

  const handleHeadingClick = useCallback(() => {
    append({
      title: "",
      isHeading: true,
      unit: null,
      quantity: null,
      amount: null,
    });
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

  return (
    <>
      <section className="flex h-fit w-fit flex-col gap-3 rounded-lg bg-white p-4  shadow dark:bg-grey">
        <DraggableContainer droppableId="ingredients" onDragEnd={handleSwap}>
          {fields.map((field, index) => (
            <DraggableItem index={index} id={field.id} key={field.id}>
              <Ingredient
                index={index}
                values={{
                  title: field.title,
                  unit: field.unit,
                  quantity: field.quantity,
                  isHeading: field.isHeading,
                  amount: field.amount,
                }}
                handleDelete={handleDelete}
              />
            </DraggableItem>
          ))}
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
    </>
  );
};

export default IngredientContainer;
