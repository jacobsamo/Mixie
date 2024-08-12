import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@mixie/supabase/server";
import * as Sentry from "@sentry/nextjs";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { z } from "zod";

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const actionWithMeta = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
});

export const authAction = actionWithMeta.use(async ({ next, metadata }) => {
  const user = await getUser();
  const supabase = createClient();

  if (!user) throw new Error("Not authenticated");

  return Sentry.withServerActionInstrumentation(metadata.name, async () => {
    return next({
      ctx: {
        user,
        supabase,
      },
    });
  });
});
