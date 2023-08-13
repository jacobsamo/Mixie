import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {}

export const config = {
  matcher: ['/recipes/:path/edit', '/:path/settings/:path', '/:path/drafts'],
};
