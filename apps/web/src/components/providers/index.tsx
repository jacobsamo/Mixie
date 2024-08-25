"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Dialogs from "./dialogs";
import { PostHogProvider } from "./posthog";
import { StoreProvider } from "./store-provider";
import UserProvider from "./user-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <UserProvider>
              <Dialogs />
              {children}
            </UserProvider>
          </StoreProvider>
          {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
        </QueryClientProvider>
      </PostHogProvider>
    </>
  );
};

export default Providers;
