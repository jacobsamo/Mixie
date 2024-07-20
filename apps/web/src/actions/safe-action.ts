import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@mixie/supabase/server";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e, utils) {
    return "Oh no, something went wrong!";
  },
});

export const authAction = action.use(async ({ next, metadata }) => {
  const user = await getUser();
  const supabase = createClient();

  if (!user) throw new Error("Not authenticated");

  return next({
    ctx: {
      user,
      supabase,
    },
  });
});
