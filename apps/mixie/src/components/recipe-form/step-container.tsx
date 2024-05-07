import { Button } from "@/components/ui/button";
import { recipeClientFormSchema } from "@/types/zodSchemas";
import { PlusCircleIcon } from "lucide-react";
import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import { DraggableContainer, DraggableItem } from "../dragable";
import { Step } from "./step";

const StepContainer = () => {
  const { control } = useFormContext<z.infer<typeof recipeClientFormSchema>>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "steps",
  });

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({ step_body: "" });
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
    <section className="flex w-full flex-col gap-2">
      <DraggableContainer droppableId="steps" onDragEnd={handleSwap}>
        {fields.map((field, index: number) => {
          return (
            <DraggableItem index={index} id={field.id} key={field.id}>
              <Step index={index} handleDelete={handleDelete} key={field.id} />
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
        variant={"secondary"}
      >
        <PlusCircleIcon className="h-5 w-5" />
        Add Step
      </Button>
    </section>
  );
};

export default StepContainer;
