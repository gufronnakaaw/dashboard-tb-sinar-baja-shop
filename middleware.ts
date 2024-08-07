import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET_KEY,
  });

  const pathname = request.nextUrl.pathname;

  if (pathname == "/") {
    if (!token) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };

  const session = await getSession({ req: requestForNextAuth });
  const response = NextResponse.next();

  response.headers.set("access_token", session?.user.access_token as string);

  return response;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/banners/:path*",
    "/categories/:path*",
    "/operational/:path*",
    "/products/:path*",
    "/transactions/:path*",
  ],
};
