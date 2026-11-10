import { NextRequest, NextResponse } from "next/server";
import { getEnquiries } from "@/lib/db";
import { getServerStaffSession } from "@/lib/auth";
import { globalRateLimiter, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);
    const rateLimit = globalRateLimiter.check(`admin:enquiries:${clientIp}`, 60, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    // 1. Strict Server-Side Authentication & Allowlist Check
    const session = await getServerStaffSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "unauthorized",
          message: "Unauthorized: Sign-in required with an approved staff account.",
        },
        { status: 401 }
      );
    }

    // 2. Fetch records only after verified authorization
    const records = await getEnquiries();

    return NextResponse.json({
      success: true,
      count: records.length,
      enquiries: records,
      requester: {
        email: session.user.email,
        role: session.user.role,
      },
    });
  } catch (error) {
    console.error("[Enquiries API Error]", (error as Error).message);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve enquiries safely." },
      { status: 500 }
    );
  }
}
