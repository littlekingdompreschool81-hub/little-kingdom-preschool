import { NextRequest, NextResponse } from "next/server";
import { getServerStaffSession } from "@/lib/auth";
import { globalRateLimiter, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimit = globalRateLimiter.check(`auth:session:${clientIp}`, 60, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json({ authenticated: false, error: "Too many requests" }, { status: 429 });
  }

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
