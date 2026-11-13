import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  // Redirect to login if no session is found
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { pathname } = request.nextUrl;
  const role = session.user.role;

  // Backoffice: USER is not allowed, send to profile
  if (pathname.startsWith("/backoffice") && role === "USER") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Profile: ADMIN is not allowed, send to backoffice
  if (pathname.startsWith("/profile") && role === "ADMIN") {
    return NextResponse.redirect(new URL("/backoffice", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/backoffice/:path*", "/profile/:path*"],
};
