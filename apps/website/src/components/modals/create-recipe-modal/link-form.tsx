import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { CreateRecipeSchema } from "./form";

const LinkForm = () => {
  const { control, register } = useFormContext<CreateRecipeSchema>();

  return (
    <>
      <FormField
        control={control}
        name="link"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipe Url</FormLabel>
            <FormControl>
              <Input
                placeholder="https://"
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

export default LinkForm;
