import { NextRequest, NextResponse } from "next/server";
import { getEnquiries } from "@/lib/db";
import { getServerStaffSession } from "@/lib/auth";
import { globalRateLimiter, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);
    const rateLimit = globalRateLimiter.check(`admin:export:${clientIp}`, 10, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Export rate limit reached. Please wait a moment." },
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

    // 3. Generate sanitized CSV output
    const headers = [
      "Reference ID",
      "Student Name",
      "Class Interested",
      "Preferred Branch",
      "Parent Name",
      "Phone",
      "Email",
      "Message",
      "Date Submitted",
    ];

    const escapeCsv = (val: string | null | undefined) => {
      if (!val) return '""';
      // Prevent CSV formula injection (=, +, -, @)
      let cleaned = val.replace(/"/g, '""');
      if (
        cleaned.startsWith("=") ||
        cleaned.startsWith("+") ||
        cleaned.startsWith("-") ||
        cleaned.startsWith("@") ||
        cleaned.startsWith("\t") ||
        cleaned.startsWith("\r")
      ) {
        cleaned = "'" + cleaned;
      }
      return `"${cleaned}"`;
    };

    const rows = records.map((e) => [
      escapeCsv(e.referenceId),
      escapeCsv(e.studentName),
      escapeCsv(e.classInterestedIn),
      escapeCsv(e.preferredBranch || "Branch 1"),
      escapeCsv(e.parentName),
      escapeCsv(e.phone),
      escapeCsv(e.email),
      escapeCsv(e.message),
      escapeCsv(new Date(e.createdAt).toISOString()),
    ]);

    const csvBody = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `Little_Kingdom_Preschool_Enquiries_${dateStr}.csv`;

    return new NextResponse(csvBody, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[CSV Export Error]", (error as Error).message);
    return NextResponse.json(
      { success: false, message: "Failed to generate CSV export safely." },
      { status: 500 }
    );
  }
}
