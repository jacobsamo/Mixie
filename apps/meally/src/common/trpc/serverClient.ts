import {
  createTRPCProxyClient,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import type { AppRouter } from "@/src/server";
import { env } from "@/env.mjs";

export const serverClient = createTRPCProxyClient<AppRouter>({
  // transformer,
  links: [
    unstable_httpBatchStreamLink({
      url: env.NEXT_PUBLIC_APP_URL + "/api/trpc",
    }),
  ],
});
