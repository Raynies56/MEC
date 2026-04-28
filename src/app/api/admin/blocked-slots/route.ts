// /app/api/admin/blocked-slots/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createBlockedSlot } from "@/lib/db/schedule";
import { z } from "zod";

const blockSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().optional(),
  reason: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = blockSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const newBlock = await createBlockedSlot(result.data);
    return NextResponse.json(newBlock);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

