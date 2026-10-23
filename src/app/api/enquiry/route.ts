import { NextResponse } from "next/server";
import { AdmissionEnquirySchema, type EnquirySubmissionResponse } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = AdmissionEnquirySchema.safeParse(body);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      const response: EnquirySubmissionResponse = {
        success: false,
        message: "Validation failed. Please verify the highlighted fields.",
        errors: formattedErrors as Record<string, string[]>,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const data = result.data;
    // Generate clean alphanumeric reference number
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `ADM-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // Log internally for developer / server verification
    console.info("[Admissions Enquiry Received]", {
      referenceId,
      student: data.studentName,
      grade: data.gradeApplying,
      email: data.email,
      timestamp,
    });

    const response: EnquirySubmissionResponse = {
      success: true,
      message: `Enquiry successfully logged for ${data.studentName}. Your application reference is ${referenceId}.`,
      referenceId,
      timestamp,
      devNotice:
        "Server-side route validated with Zod and generated reference ID. To connect live email notifications and CRM/DB persistence, provision client SMTP and database credentials.",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[Admissions Enquiry Error]", error);
    const response: EnquirySubmissionResponse = {
      success: false,
      message: "An internal server error occurred while processing your enquiry. Please try again shortly.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
