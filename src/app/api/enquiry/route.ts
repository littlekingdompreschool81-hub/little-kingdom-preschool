import { NextResponse } from "next/server";
import { PreschoolEnquirySchema, type EnquirySubmissionResponse, type EnquiryRecord } from "@/lib/validation";
import { saveEnquiry, updateNotificationStatus } from "@/lib/db";
import { sendEnquiryEmailNotification } from "@/lib/notifications/email";
import { sendEnquiryWhatsAppNotification } from "@/lib/notifications/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = PreschoolEnquirySchema.safeParse(body);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      const response: EnquirySubmissionResponse = {
        success: false,
        message: "Please check the highlighted fields and try again.",
        errors: formattedErrors as Record<string, string[]>,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const data = result.data;

    // Honeypot check - reject spam silently or with 400
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json(
        { success: false, message: "Invalid submission detected." },
        { status: 400 }
      );
    }

    // Generate unique reference number for Little Kingdom Preschool
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `LK-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();
    const recordId = `enq_${Date.now()}_${randomSuffix}`;

    const newRecord: EnquiryRecord = {
      id: recordId,
      referenceId,
      parentName: data.parentName,
      studentName: data.studentName,
      phone: data.phone,
      email: data.email || null,
      classInterestedIn: data.classInterestedIn,
      preferredBranch: data.preferredBranch || "Either / Nearest Branch",
      message: data.message || null,
      createdAt: timestamp,
      emailNotificationStatus: "pending",
      whatsappNotificationStatus: "pending",
    };

    // 1. Persist enquiry in real database FIRST
    await saveEnquiry(newRecord);

    // 2. Attempt notifications without exposing private data
    const emailResult = await sendEnquiryEmailNotification(newRecord);
    const whatsappResult = await sendEnquiryWhatsAppNotification(newRecord);

    // 3. Update notification statuses in database
    await updateNotificationStatus(referenceId, {
      emailStatus: emailResult.status,
      whatsappStatus: whatsappResult.status,
    });

    const response: EnquirySubmissionResponse = {
      success: true,
      message: `Thank you, ${data.parentName}! Your admission enquiry for ${data.studentName} (${data.classInterestedIn}) has been recorded. Our admissions desk will reach out to you shortly.`,
      referenceId,
      timestamp,
      notificationSummary: {
        emailStatus: emailResult.status,
        whatsappStatus: whatsappResult.status,
        details:
          emailResult.status === "sent" && whatsappResult.status === "sent"
            ? "Notifications delivered to school management."
            : "Enquiry securely saved in database. (Email/WhatsApp gateways active upon server environment credential configuration).",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[Admissions API Error]", (error as Error).message);
    const response: EnquirySubmissionResponse = {
      success: false,
      message: "An internal server error occurred while saving your enquiry. Please try again or call the admissions desk directly.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
