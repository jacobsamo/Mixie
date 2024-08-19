"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect } from "react";
import Dialogs from "./dialogs";
import { PostHogProvider } from "./posthog";
import { StoreProvider, useStore } from "./store-provider";
import { createClient } from "@mixie/supabase/client";
import posthog from "posthog-js";
import { getUserData } from "@/actions/user/get-user-data";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const store = useStore((store) => store);

  // listen to auth to do things around the user
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
        getUserData({ userId: session.user.id }).then((res) => {
          if (res?.data) {
            const data = res.data;
            store.setBookmarkLinks(data.bookmark_links);
            store.setBookmarks(data.bookmarks);
            store.setCollections(data.collections);
          }
        });
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
