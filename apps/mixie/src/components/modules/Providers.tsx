"use client";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import StateProvider from "./StateProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <JotaiProvider>
            <StateProvider>
              <NextThemesProvider attribute="class" enableSystem>
                {children}
              </NextThemesProvider>
            </StateProvider>
          </JotaiProvider>
        </SessionProvider>
        {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
      </QueryClientProvider>
    </>
  );
};

export default Providers;
