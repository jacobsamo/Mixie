"use client";
import { getUserData } from "@/actions/user/get-user-data";
import { createClient } from "@mixie/supabase/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import posthog from "posthog-js";
import React, { useEffect } from "react";
import { useStore } from "./store-provider";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
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
      <NextThemesProvider attribute="class" enableSystem>
        {children}
      </NextThemesProvider>
    </>
  );
};

export default UserProvider;
