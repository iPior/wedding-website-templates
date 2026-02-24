import { NextRequest, NextResponse } from "next/server";
import { SITE_ACCESS_COOKIE, SITE_ACCESS_COOKIE_VALUE } from "@wedding/auth/constants";

const PUBLIC_ROUTES = ["/password", "/auth", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/rsvp/modify/")) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isPublic) {
    return NextResponse.next();
  }

  const hasAccess =
    request.cookies.get(SITE_ACCESS_COOKIE)?.value === SITE_ACCESS_COOKIE_VALUE;
  if (hasAccess) {
    return NextResponse.next();
  }

  const passwordUrl = new URL("/password", request.url);
  return NextResponse.redirect(passwordUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/|maps/).*)",
  ],
};
