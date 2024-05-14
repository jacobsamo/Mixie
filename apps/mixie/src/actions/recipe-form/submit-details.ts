"use server";

import { action } from "@/actions/safe-action";
import { detailsSchema } from "@/actions/schema";

export const submitDetails = action(detailsSchema, async (params) => {
  return params;
});
