import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Redirect if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/errors', req.url));
  }

  try {
    // Verify JWT using jose
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret) as { payload: JWTPayload & { role?: string } };

    // Role-based protection
    const urlPath = req.nextUrl.pathname;

    // Protect '/pages/dashboard' for admin only
    if (urlPath.startsWith('/addgames') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/errors', req.url));
    }

    // Allow access if the role is admin or the path is not '/pages/dashboard'
    return NextResponse.next();

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Token verification failed:", error.message);
    } else {
      console.error("Unexpected error occurred during token verification");
    }
    return NextResponse.redirect(new URL('/errors', req.url));
  }
}

export const config = {
  matcher: ['/pages/article/:path*', '/addgames/:path*'],
};
