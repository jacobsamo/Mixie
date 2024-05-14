import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/advanced-components/textarea";
import { recipeClientFormSchema } from "@/types/zodSchemas";
import { Trash2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
interface StepProps {
  index: number;
  handleDelete: (index: number) => void;
}

const Step = ({ index, handleDelete }: StepProps) => {
  const { control, getValues } =
    useFormContext<z.infer<typeof recipeClientFormSchema>>();

  return (
    <div
      key={index}
      className="relative flex w-full flex-col rounded-2xl p-3 shadow dark:bg-grey"
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-Roboto text-step0 font-medium">Step {index + 1}</h1>
        <Button
          aria-label="delete ingredient"
          onClick={() => handleDelete(index)}
          type="button"
          className="rounded-md border border-solid border-red bg-transparent  hover:bg-red"
          // variant={'secondary'}
          size="icon"
        >
          <Trash2Icon className="h-6 w-6 text-red hover:text-white" />
        </Button>
      </div>
      <Textarea
        defaultValue={getValues(`steps.${index}.step_body`) || ""}
        id={`steps.${index}.step_body`}
        label=""
        name={`steps.${index}.step_body`}
        control={control}
        border={false}
        classNames={{
          inputWrapper: "border border-solid border-white rounded-md",
        }}
        className="border border-solid border-white shadow-none outline outline-1"
      />
    </div>
  );
};

export { Step };
