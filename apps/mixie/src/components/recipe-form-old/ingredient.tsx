import { SelectComponent } from "@/components/ui/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/advanced-components/input";
import { units } from "@/lib/services/data";
import { Ingredient as IngredientType } from "@/types";
import { recipeClientFormSchema } from "@/types/zodSchemas";
import { GripVertical, Trash2Icon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import * as z from "zod";

interface IngredientProps {
  index: number;
  values: IngredientType;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, values, handleDelete }: IngredientProps) => {
  const { register, getValues, setValue, watch, control } =
    useFormContext<z.infer<typeof recipeClientFormSchema>>();
  const activeUnit = watch(`ingredients.${index}.unit`);

  if (values.isHeading) {
    return (
      <div className="mt-4 flex flex-row flex-wrap items-center gap-1">
        <GripVertical />

        <Input
          {...register(`ingredients.${index}.title` as const)}
          placeholder="Heading..."
          classNames={{
            container: "h-12",
          }}
        />
        <Button
          aria-label="delete ingredient"
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
    <div className="flex flex-row flex-wrap items-center gap-1 rounded-md">
      <GripVertical />

      <Input
        {...register(`ingredients.${index}.title` as const)}
        placeholder="Ingredient"
      />

      <Controller
        control={control}
        name={`ingredients.${index}.unit`}
        defaultValue={getValues(`ingredients.${index}.unit`)}
        render={({ field }) => (
          <SelectComponent
            clearable={false}
            options={units}
            onChange={field.onChange}
            value={field.value}
            placeholder="Unit"
          />
        )}
      />

      <Input
        type="number"
        {...register(`ingredients.${index}.quantity`, {
          setValueAs: (v) => (v ? parseInt(v) : null),
        })}
      />

      {["cup", "tbsp", "tsp"].includes(activeUnit?.value ?? "not_set") && (
        <Controller
          control={control}
          name={`ingredients.${index}.amount`}
          render={({ field }) => (
            <SelectComponent
              clearable={false}
              options={[
                { value: "not_set", label: "not_set" },
                { value: "1/8", label: "1/8" },
                { value: "1/4", label: "1/4" },
                { value: "1/3", label: "1/3" },
                { value: "1/2", label: "1/2" },
                { value: "2/3", label: "2/3" },
                { value: "3/4", label: "3/4" },
              ]}
              onChange={field.onChange}
              value={field.value}
              placeholder="Cup Unit"
            />
          )}
        />
      )}

      <Button
        aria-label="delete ingredient"
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
