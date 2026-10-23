import { NextResponse } from "next/server";
import { getEnquiries } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const records = await getEnquiries();
    return NextResponse.json({
      success: true,
      count: records.length,
      enquiries: records,
    });
  } catch (error) {
    console.error("[Enquiries API Error]", (error as Error).message);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve enquiries" },
      { status: 500 }
    );
  }
}
