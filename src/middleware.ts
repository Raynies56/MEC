// /middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
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

  // 3. CSRF Protection for API Mutations
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const isMutation = ["POST", "PUT", "DELETE", "PATCH"].includes(request.method);

  if (isMutation && pathname.startsWith("/api")) {
    if (!origin || !origin.includes(host || "")) {
      return NextResponse.json({ error: "Invalid Origin (CSRF Protection)" }, { status: 403 });
    }
  }

  // Security Headers
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://*.google.com https://*.googleapis.com https://*.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.supabase.co",
      "frame-src 'self' https://*.google.com https://google.com https://*.google.com.do https://*.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.googleapis.com https://*.google.com https://*.google-analytics.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  );
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  
  // Stealth Headers
  res.headers.set("X-Powered-By", "Antigravity Secure Core");
  res.headers.delete("x-nextjs-cache");

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

