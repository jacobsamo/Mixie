import { NextFetchEvent, type NextRequest } from "next/server";
import { updateSession } from "@mixie/supabase/middleware";
import { Logger } from "next-axiom";
import { env } from "env";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (env.NODE_ENV === "production") {
    const log = new Logger({ source: "middleware" });
    log.middleware(request);

    event.waitUntil(log.flush());
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
