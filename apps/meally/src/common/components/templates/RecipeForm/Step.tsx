import { TrashIcon } from 'lucide-react';
import { Textarea } from '../../ui/textarea';
import { useFormContext } from 'react-hook-form';

interface StepProps {
  index: number;
  handleDelete: (index: number) => void;
}

const Step = ({ index, handleDelete }: StepProps) => {
  const { control, getValues } = useFormContext();

  return (
    <section
      key={index}
      className="flex flex-col w-full p-3 rounded-2xl"
    >
      <h1 className="font-medium font-Roboto text-step0">Step {index + 1}</h1>
      <Textarea
        defaultValue={getValues(`steps.${index}.step_body`)}
        id={`steps.${index}.step_body`}
        label=""
        name={`steps.${index}.step_body`}
        control={control}
        className="shadow-none outline outline-1 "
      />
      <button
        onClick={() => handleDelete(index)}
        type="button"
        className="absolute right-2 top-2"
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Step };
