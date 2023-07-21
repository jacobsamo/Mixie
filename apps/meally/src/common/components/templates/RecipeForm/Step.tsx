import { TrashIcon } from 'lucide-react';
import { Textarea } from '../../ui/textarea';
import { useFormContext } from 'react-hook-form';
import { formSchema } from './form';
import * as z from 'zod';
interface StepProps {
  index: number;
  handleDelete: (index: number) => void;
}

const Step = ({ index, handleDelete }: StepProps) => {
  const { control, getValues } = useFormContext<z.infer<typeof formSchema>>();

  return (
    <section
      key={index}
      className="flex flex-col w-full relative p-3 rounded-2xl"
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium font-Roboto text-step0">Step {index + 1}</h1>
        <button
          onClick={() => handleDelete(index)}
          type="button"
          className="text-red"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
      <Textarea
        defaultValue={getValues(`steps.${index}.step_body`)}
        id={`steps.${index}.step_body`}
        label=""
        name={`steps.${index}.step_body`}
        control={control}
        className="shadow-none outline outline-1 "
      />
    </section>
  );
};

export { Step };
