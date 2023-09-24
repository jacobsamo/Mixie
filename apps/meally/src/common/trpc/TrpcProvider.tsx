// src/trpc/react.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/src/server";
import { trpc } from "./client";

export default function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers: Headers; // <-- Important
}) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      // transformer,
      links: [
        unstable_httpBatchStreamLink({
          headers() {
            const headers = new Map(props.headers);
            return Object.fromEntries(headers);
          },
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
