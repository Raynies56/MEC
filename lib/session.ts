// /lib/session.ts

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/types/admin";

export const sessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 8, // 8 horas
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
    session.userId = "";
    session.name = "";
    session.email = "";
  }

  return session;
}
