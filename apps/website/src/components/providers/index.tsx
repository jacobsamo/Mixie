"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import Dialogs from "./dialogs";
import { PostHogProvider } from "./posthog";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider attribute="class" enableSystem>
            <Dialogs />
            {children}
          </NextThemesProvider>

          {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
        </QueryClientProvider>
      </PostHogProvider>
    </>
  );
};

export default Providers;
