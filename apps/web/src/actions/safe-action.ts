import logger from "@/lib/services/logger";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@mixie/supabase/server";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e, utils) {
    logger.error(`Server error: ${e.message}`, {
      location: "safe-action",
      message: JSON.stringify({
        error: e.message,
        stack: e.stack,
      }),
      statusCode: 500,
    });
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
