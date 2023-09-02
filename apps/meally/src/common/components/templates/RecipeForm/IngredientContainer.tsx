import { useCallback } from "react";
import { Ingredient } from "./Ingredient";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DraggAbleCard } from "./Dragableitem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { recipeFormSchema } from "@/src/db/zodSchemas";
import * as z from "zod";

const IngredientContainer = () => {
  const { control, register } =
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
      unit: "grams",
      quantity: null,
      isHeading: false,
      amount: "not_set",
    });
  }, [append]);

  const handleHeadingClick = useCallback(() => {
    append({
      title: "",
      isHeading: true,
      unit: "not_set",
      quantity: null,
      amount: "not_set",
    });
  }, [append]);

  const handleSwap = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      move(sourceIndex, targetIndex);
    },
    [move]
  );

  return (
    <>
      <section className="flex h-fit w-fit flex-col gap-3 rounded-lg bg-white p-4  shadow dark:bg-grey">
        <DndProvider backend={HTML5Backend}>
          {fields.map((field, index) => (
            <DraggAbleCard
              index={index}
              id={field.id}
              key={field.id}
              acceptType="ingredient"
              moveCard={handleSwap}
              showHandle
            >
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
                key={field.id}
              />
            </DraggAbleCard>
          ))}
        </DndProvider>
        <button
          type="button"
          onClick={() => handleHeadingClick()}
          className="mt-0 text-step--3"
        >
          Add Heading
        </button>
        <Button
          ariaLabel="Add an ingredient"
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

export { IngredientContainer };
