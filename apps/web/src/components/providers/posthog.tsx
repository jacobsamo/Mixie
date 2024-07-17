"use client";
import posthog from "posthog-js";
import { PostHogProvider as PostHog } from "posthog-js/react";
import { env } from "env";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
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
  return <PostHog client={posthog}>{children}</PostHog>;
}
