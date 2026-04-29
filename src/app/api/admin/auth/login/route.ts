// /app/api/admin/auth/login/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { verifyAdminCredentials } from "@/lib/auth/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
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
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

