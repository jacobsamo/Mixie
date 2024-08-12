"use client";
import posthog from "posthog-js";
import { PostHogProvider as PostHog } from "posthog-js/react";
import { env } from "env";
import { createClient } from "@mixie/supabase/client";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/_proxy/posthog/ingest",
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    enable_heatmaps: true,
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
        email: true,
      },
    },
    loaded: function (ph) {
      if (process.env.NODE_ENV == "development") {
        ph.opt_out_capturing();
        ph.set_config({ disable_session_recording: true });
      }
    },
  });
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    posthog.opt_out_capturing();
    posthog.set_config({ disable_session_recording: true });
  }
}
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // use the user's id to identify them in posthog
        // using the users id to ensure that the user can't be personally identifiable
        posthog.identify(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <PostHog client={posthog}>{children}</PostHog>;
}
