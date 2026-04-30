// /lib/session.ts

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/types/admin";

const SESSION_PASSWORD = process.env.SESSION_PASSWORD;

if (!SESSION_PASSWORD || SESSION_PASSWORD.length < 32) {
  throw new Error("❌ SEGURIDAD CRÍTICA: SESSION_PASSWORD debe tener al menos 32 caracteres.");
}

export const sessionOptions = {
  password: SESSION_PASSWORD,
  cookieName: "admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 8, // 8 horas
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
    session.userId = "";
    session.name = "";
    session.email = "";
  }

  return session;
}

