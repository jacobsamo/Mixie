import { Trash2Icon } from 'lucide-react';
import { Textarea } from '../../ui/textarea';
import { useFormContext } from 'react-hook-form';
import { formSchema } from './form';
import * as z from 'zod';
import { Button } from '../../ui/button';
interface StepProps {
  index: number;
  handleDelete: (index: number) => void;
}

const Step = ({ index, handleDelete }: StepProps) => {
  const { control, getValues } = useFormContext<z.infer<typeof formSchema>>();

  return (
    <div
      key={index}
      className="flex flex-col w-full relative p-3 rounded-2xl shadow dark:bg-grey"
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium font-Roboto text-step0">Step {index + 1}</h1>
        <Button
          ariaLabel="delete ingredient"
          onClick={() => handleDelete(index)}
          type="button"
          className="bg-transparent border border-solid border-red hover:bg-red  rounded-md"
          // variant={'secondary'}
          size="icon"
        >
          <Trash2Icon className="h-6 w-6 text-red hover:text-white" />
        </Button>
      </div>
      <Textarea
        defaultValue={getValues(`steps.${index}.step_body`)}
        id={`steps.${index}.step_body`}
        label=""
        name={`steps.${index}.step_body`}
        control={control}
        classNames={{
          inputWrapper: 'border border-solid border-white rounded-md',
        }}
        className="shadow-none outline outline-1 border border-solid border-white"
      />
    </div>
  );
};

export { Step };
