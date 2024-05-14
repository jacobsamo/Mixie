import { stepsSchema } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SharedProps } from "./shared";

export interface StepsProps extends SharedProps {}

const Steps = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof stepsSchema>>({
    resolver: zodResolver(stepsSchema),
  });
  return <div>Steps</div>;
};

export default Steps;
