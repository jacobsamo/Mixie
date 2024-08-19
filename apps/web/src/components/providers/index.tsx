"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect } from "react";
import Dialogs from "./dialogs";
import { PostHogProvider } from "./posthog";
import { StoreProvider } from "./store-provider";
import { createClient } from "@mixie/supabase/client";
import posthog from "posthog-js";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // use the user's id to identify them in posthog
        // using the users id to ensure that the user can't be personally identifiable
        posthog.identify(session.user.id);
        //TODO: fetch user data from supabase
      } 
      if (event === "SIGNED_OUT") {
        posthog.reset();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <NextThemesProvider attribute="class" enableSystem>
              <Dialogs />
              {children}
            </NextThemesProvider>
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
