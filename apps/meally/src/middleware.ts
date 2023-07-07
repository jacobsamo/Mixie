import { NextRequest, NextResponse } from 'next/server';


//TODO: get it working with nextauth default config rather than custom mapping
export async function middleware(req: NextRequest) {
  const { pathname, search, origin, basePath } = req.nextUrl;
  const session = await req.cookies.get('next-auth.session-token');

  if (!session) {
    if (
      `${basePath}${pathname}`.startsWith('/recipes') &&
      `${basePath}${pathname}`.includes('/edit')
    ) {
      return NextResponse.redirect(new URL(`/api/auth/signin`, origin));
    }

    if (`${basePath}${pathname}`.includes('/settings')) {
      return NextResponse.redirect(new URL(`/api/auth/signin`, origin));
    }
  }
}
