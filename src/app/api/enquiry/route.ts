import { NextResponse } from "next/server";
import { PreschoolEnquirySchema, type EnquirySubmissionResponse, type EnquiryRecord } from "@/lib/validation";
import { saveEnquiry, updateNotificationStatus } from "@/lib/db";
import { sendEnquiryEmailNotification } from "@/lib/notifications/email";
import { sendEnquiryWhatsAppNotification } from "@/lib/notifications/whatsapp";
import { globalRateLimiter, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request.headers);

    // 1. Sliding Window Rate Limiting (5 enquiries per 10 minutes per IP, 15 min lockout on abuse)
    const rateLimit = globalRateLimiter.check(`enquiry:${clientIp}`, 5, 600, 900);
    if (!rateLimit.allowed) {
      const waitMinutes = Math.ceil(rateLimit.resetSeconds / 60);
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from this connection. For security reasons, please wait ${waitMinutes} minute(s) before trying again or call us directly at 7039015296.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Strict Payload Size Check (Max 32KB to prevent memory exhaustion)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 32 * 1024) {
      return NextResponse.json(
        { success: false, message: "Payload too large." },
        { status: 413 }
      );
    }

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

    // 3. Honeypot check - reject spam bots silently or with 400
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json(
        { success: false, message: "Invalid submission detected." },
        { status: 400 }
      );
    }

    // 4. Generate cryptographically strong unique reference number
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
      preferredBranch: data.preferredBranch || "Branch 1",
      message: data.message || null,
      createdAt: timestamp,
      emailNotificationStatus: "pending",
      whatsappNotificationStatus: "pending",
    };

    // 5. Persist enquiry in real database FIRST
    await saveEnquiry(newRecord);

    // 6. Attempt notifications without exposing private server data
    const emailResult = await sendEnquiryEmailNotification(newRecord);
    const whatsappResult = await sendEnquiryWhatsAppNotification(newRecord);

    // 7. Update notification statuses in database
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
        directWhatsAppUrl: whatsappResult.directWhatsAppUrl,
        details:
          emailResult.status === "sent" && whatsappResult.status === "sent"
            ? "Notifications delivered to school management (Email & WhatsApp)."
            : emailResult.status === "sent"
            ? `Notification delivered to ${process.env.SCHOOL_NOTIFICATION_EMAIL || "littlekingdompreschool81@gmail.com"}.`
            : whatsappResult.status === "sent"
            ? `WhatsApp notification dispatched to ${process.env.WHATSAPP_NOTIFY_NUMBER || "+917039015296"}.`
            : "Enquiry securely saved in database. Automated delivery active for littlekingdompreschool81@gmail.com and WhatsApp 7039015296.",
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (error) {
    // Log internally but never leak server internals, paths or stacks to public client
    console.error("[Admissions API Error]", (error as Error).message);
    const response: EnquirySubmissionResponse = {
      success: false,
      message: "An internal server error occurred while saving your enquiry. Please try again or call the admissions desk directly at 7039015296.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
