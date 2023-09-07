import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/src/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
