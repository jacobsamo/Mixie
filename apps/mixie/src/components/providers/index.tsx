"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import StateProvider from "./state-provider";
import Dialogs from "./dialogs";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <StateProvider>
              <NextThemesProvider attribute="class" enableSystem>
                <Dialogs />
                {children}
              </NextThemesProvider>
            </StateProvider>
          </JotaiProvider>
        {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
      </QueryClientProvider>
    </>
  );
};

export default Providers;
