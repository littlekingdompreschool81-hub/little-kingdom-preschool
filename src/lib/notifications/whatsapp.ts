import { type EnquiryRecord } from "../validation";

export interface WhatsAppDispatchResult {
  status: "sent" | "not_configured" | "failed";
  info: string;
}

/**
 * Server-side WhatsApp notification dispatcher using WhatsApp Business Cloud API.
 * Respects Meta messaging policies and template delivery guidelines.
 * Credentials remain strictly on the server and are never exposed.
 */
export async function sendEnquiryWhatsAppNotification(
  record: EnquiryRecord
): Promise<WhatsAppDispatchResult> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const schoolRecipientNumber = process.env.WHATSAPP_NOTIFY_NUMBER;

  if (!token || !phoneNumberId || !schoolRecipientNumber) {
    return {
      status: "not_configured",
      info: "WhatsApp notification not configured: Set WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID, and WHATSAPP_NOTIFY_NUMBER in server environment.",
    };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: schoolRecipientNumber,
      type: "text",
      text: {
        body: `*Little Kingdom Preschool - New Admission Enquiry*\n\nRef: ${record.referenceId}\nClass: ${record.classInterestedIn}\nStudent: ${record.studentName}\nParent: ${record.parentName}\nPhone: ${record.phone}\nTime: ${record.createdAt}`,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`WhatsApp API responded with status ${response.status}`);
    }

    return {
      status: "sent",
      info: `WhatsApp message dispatched to ${schoolRecipientNumber}`,
    };
  } catch (error) {
    // Safe error logging: no personal data exposed
    console.error("[WhatsApp Notification Failed] Reference:", record.referenceId, (error as Error).message);
    return {
      status: "failed",
      info: "WhatsApp API dispatch failed",
    };
  }
}
