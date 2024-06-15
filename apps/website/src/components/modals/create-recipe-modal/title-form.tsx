import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateRecipeSchema } from "@/lib/utils/recipe-imports";
import { useFormContext } from "react-hook-form";

const TitleForm = () => {
  const { register, control } = useFormContext<CreateRecipeSchema>();

  return (
    <>
      <FormField
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipe Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Title"
                {...field}
                value={field.value ?? undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TitleForm;
