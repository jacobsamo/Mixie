import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateRecipeSchema } from "@/lib/utils/recipe-imports";
import { useFormContext } from "react-hook-form";

const UploadForm = () => {
  const { register, control } = useFormContext<CreateRecipeSchema>();

  return (
    <>
      <FormField
        control={control}
        name="content"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipes text</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={`ingredients:\n1 cup of sugar\n2 cups of flour\n3 eggs\n...\n\nSteps:\n 1. Mix sugar and flour\n 2. Add eggs\n 3. ...`}
                className="h-48 resize-none"
                value={field?.value ?? undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <Textarea
        placeholder={`
                ingredients: 
                1 cup of sugar
                2 cups of flour
                3 eggs
                ...

                Steps:
                1. Mix sugar and flour
                2. Add eggs
                3. ...
                `}
        {...register("content")}
      /> */}
    </>
  );
};

export default UploadForm;
