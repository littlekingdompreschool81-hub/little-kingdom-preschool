import { NextResponse } from "next/server";
import { getServerStaffSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerStaffSession();

  if (!session) {
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    isAdmin: session.isAdmin,
    expiresAt: session.expiresAt,
  });
}
