"use server";

import { action } from "@/actions/safe-action";
import { stepsSchema } from "@/actions/schema";

export const submitSteps = action(stepsSchema, async (params) => {
  return params;
});
