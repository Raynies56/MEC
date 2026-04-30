// /app/api/admin/auth/login/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { verifyAdminCredentials } from "@/lib/auth/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // Rate limit: 5 login attempts per 15 minutes per IP
  const ip = getClientIP(request);
  const { allowed, remaining, resetIn } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intente de nuevo más tarde.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(resetIn / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { email, password } = result.data;
    const user = await verifyAdminCredentials(email, password);

    if (!user) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = user.id;
    session.name = user.name || "";
    session.email = user.email;
    
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message?.includes("CUENTA_BLOQUEADA")) {
      return NextResponse.json({ error: error.message }, { status: 423 });
    }
    
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

