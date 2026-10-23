import { type EnquiryRecord } from "../validation";

export interface EmailDispatchResult {
  status: "sent" | "not_configured" | "failed";
  info: string;
}

/**
 * Server-side transactional email dispatcher for school enquiries.
 * Credentials are read exclusively from server environment variables.
 * Never exposes credentials to client or public browser code.
 */
export async function sendEnquiryEmailNotification(
  record: EnquiryRecord
): Promise<EmailDispatchResult> {
  const recipient = process.env.SCHOOL_NOTIFICATION_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;

  // If no email service is configured in environment, report transparently
  if (!recipient || (!resendApiKey && !smtpHost)) {
    return {
      status: "not_configured",
      info: "Email notifications not configured: Set SCHOOL_NOTIFICATION_EMAIL and RESEND_API_KEY (or SMTP credentials) in server environment.",
    };
  }

  try {
    // If Resend API key is provided
    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "admissions@littlekingdom.edu",
          to: recipient,
          subject: `[New Admission Enquiry] ${record.studentName} - ${record.classInterestedIn} (${record.referenceId})`,
          text: `New Admission Enquiry Received at Little Kingdom Preschool:
Reference: ${record.referenceId}
Class: ${record.classInterestedIn}
Parent/Guardian: ${record.parentName}
Contact: ${record.phone}
Email: ${record.email || "Not provided"}
Message: ${record.message || "None"}
Received: ${record.createdAt}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend API returned status ${response.status}`);
      }

      return {
        status: "sent",
        info: `Notification successfully dispatched to ${recipient}`,
      };
    }

    return {
      status: "not_configured",
      info: "SMTP configuration detected but requires external transport driver",
    };
  } catch (error) {
    // Log failure without exposing personal data
    console.error("[Email Notification Failed] Reference:", record.referenceId, (error as Error).message);
    return {
      status: "failed",
      info: "Failed to dispatch email via configured provider",
    };
  }
}
