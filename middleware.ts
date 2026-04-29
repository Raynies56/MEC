// /middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { SessionData } from "@/types/admin";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(request, res, sessionOptions);

  const { pathname } = request.nextUrl;

  // 1. Si intenta acceder a rutas /admin (excepto login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. Si ya tiene sesión e intenta ir a login
  if (pathname === "/admin/login") {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/citas", request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
