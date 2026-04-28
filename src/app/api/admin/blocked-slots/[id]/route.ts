// /app/api/admin/blocked-slots/[id]/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { deleteBlockedSlot } from "@/lib/db/schedule";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteBlockedSlot(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

