import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import React from "react";
import { extractRouterConfig } from "uploadthing/server";

export const dynamic = "force-dynamic";

const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      {children}
    </>
  );
};

export default PreviewLayout;
