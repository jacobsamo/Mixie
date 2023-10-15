import {
  createTRPCProxyClient,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import type { AppRouter } from "@/src/server";
import { env } from "@/env.mjs";
import * as crypto from "crypto";

const hash = crypto.createHash("sha256");
const token = hash.update(env.NEXT_API_APP_TOKEN).digest("hex");

export const serverClient = createTRPCProxyClient<AppRouter>({
  // transformer,
  links: [
    unstable_httpBatchStreamLink({
      url: env.NEXT_PUBLIC_APP_URL + "/api/trpc",
      headers: {
        authorization: token,
      },
    }),
  ],
});
