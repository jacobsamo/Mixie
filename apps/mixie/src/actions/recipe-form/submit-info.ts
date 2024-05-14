"use server";

import { action } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";

export const submitInfo = action(infoSchema, async (params) => {
  return params;
});
