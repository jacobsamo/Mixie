import { ingredientsSchema } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SharedProps } from "./shared";

export interface IngredientsProps extends SharedProps {}

const Ingredients = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ingredientsSchema>>({
    resolver: zodResolver(ingredientsSchema),
  });

  return <div>Ingredients</div>;
};

export default Ingredients;
