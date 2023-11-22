"use client";
import { NextAuthProvider } from "@components/layouts/NextAuthProvider";

import React from "react";
import { ThemeProvider } from "@components/modules/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" enableSystem>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </>
  );
};

export default Providers;
