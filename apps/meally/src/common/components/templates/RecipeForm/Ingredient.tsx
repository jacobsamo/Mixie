import { Trash2Icon } from "lucide-react";
import { units } from "@/src/common/lib/services/data";
import { Controller, useFormContext } from "react-hook-form";
import { Ingredient as IngredientType } from "@db/types";
import { Input } from "../../ui/input";
import { recipeFormSchema } from "@db/zodSchemas";
import * as z from "zod";
import { Button } from "../../ui/button";
import { SelectComponent } from "../../ui/SelectComponent";
import { useEffect } from "react";

interface IngredientProps {
  index: number;
  values: IngredientType;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, values, handleDelete }: IngredientProps) => {
  const { register, getValues, watch, control } =
    useFormContext<z.infer<typeof recipeFormSchema>>();
  const activeUnit = watch(`ingredients.${index}.unit`);

  if (values.isHeading) {
    return (
      <div className="mt-4 flex flex-row flex-wrap items-center gap-1">
        <Input
          {...register(`ingredients.${index}.title` as const)}
          placeholder="Heading..."
        />
        <Button
          ariaLabel="delete ingredient"
          onClick={() => handleDelete(index)}
          type="button"
          className="rounded-md border border-solid border-red bg-transparent  hover:bg-red"
          size="icon"
        >
          <Trash2Icon className="h-6 w-6 text-red group-hover:text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div
      key={index}
      className="flex flex-row flex-wrap items-center gap-1 rounded-md"
    >
      <Input
        {...register(`ingredients.${index}.title` as const)}
        placeholder="Ingredient"
      />

      <Controller
        control={control}
        name={`ingredients.${index}.unit`}
        render={({ field }) => (
          <SelectComponent
            clearable={false}
            options={units}
            onChange={field.onChange}
            value={field?.value}
            placeholder="Unit"
          />
        )}
      />

      <Input
        type="number"
        {...register(`ingredients.${index}.quantity`, {
          min: 0,
          valueAsNumber: true,
          validate: (value) => {
            if (value === 0) {
              return "Quantity cannot be 0";
            }
            return true;
          },
        })}
      />
      {["cup", "tbsp", "tsp"].includes(activeUnit.value) ? (
        <Controller
          control={control}
          name={`ingredients.${index}.amount`}
          render={({ field }) => (
            <SelectComponent
              clearable={false}
              options={[
                { value: "not_set", label: " " },
                { value: "1/8", label: "1/8" },
                { value: "1/2", label: "1/2" },
                { value: "1/3", label: "1/3" },
                { value: "2/3", label: "2/3" },
                { value: "1/4", label: "1/4" },
                { value: "3/4", label: "3/4" },
              ]}
              onChange={field.onChange}
              value={field?.value}
              placeholder="Cup Unit"
            />
          )}
        />
      ) : (
        <></>
      )}

      <Button
        ariaLabel="delete ingredient"
        onClick={() => handleDelete(index)}
        type="button"
        className="rounded-md border border-solid border-red bg-transparent  hover:bg-red"
        size="icon"
      >
        <Trash2Icon className="h-6 w-6 text-red hover:text-white" />
      </Button>
    </div>
  );
};

export { Ingredient };
