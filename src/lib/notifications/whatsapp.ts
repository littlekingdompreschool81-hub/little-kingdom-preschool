import { type EnquiryRecord } from "../validation";

export interface WhatsAppDispatchResult {
  status: "sent" | "not_configured" | "failed";
  info: string;
  directWhatsAppUrl?: string;
}

/**
 * Server-side WhatsApp notification dispatcher.
 * Recipient defaults to Little Kingdom Preschool official WhatsApp:
 * +91 7039015296
 */
export async function sendEnquiryWhatsAppNotification(
  record: EnquiryRecord
): Promise<WhatsAppDispatchResult> {
  const schoolRecipientNumber =
    process.env.WHATSAPP_NOTIFY_NUMBER || "+917039015296";
  const cleanNumber = schoolRecipientNumber.replace(/[^0-9]/g, "");

  const submissionTime = new Date(record.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const formattedWhatsAppText =
`🏰 *LITTLE KINGDOM PRESCHOOL* 🏰
*New Admission Enquiry Received!*

📋 *Ref ID:* ${record.referenceId}
👶 *Student:* ${record.studentName}
🎒 *Class:* ${record.classInterestedIn}
🏫 *Branch:* ${record.preferredBranch || "Either / Nearest Branch"}

👤 *Parent:* ${record.parentName}
📞 *Phone:* ${record.phone}
✉️ *Email:* ${record.email || "Not provided"}

📝 *Note:* ${record.message || "None"}
⏰ *Time:* ${submissionTime} (IST)`;

  const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedWhatsAppText)}`;

  // 1. Try CallMeBot Free WhatsApp API (if CALLMEBOT_API_KEY is configured)
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  if (callMeBotKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanNumber}&text=${encodeURIComponent(formattedWhatsAppText)}&apikey=${callMeBotKey}`;
      const res = await fetch(url);
      if (res.ok) {
        return {
          status: "sent",
          info: `WhatsApp message dispatched via CallMeBot to +${cleanNumber}`,
          directWhatsAppUrl,
        };
      }
    } catch (err) {
      console.error("[CallMeBot WhatsApp Failed] Reference:", record.referenceId, (err as Error).message);
    }
  }

  // 2. Try Meta WhatsApp Cloud API (if token & phone number ID provided)
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (token && phoneNumberId) {
    try {
      const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanNumber,
        type: "text",
        text: {
          body: formattedWhatsAppText,
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

      if (response.ok) {
        return {
          status: "sent",
          info: `WhatsApp message dispatched to +${cleanNumber} via Meta Cloud API`,
          directWhatsAppUrl,
        };
      }
    } catch (error) {
      console.error("[WhatsApp Cloud API Failed] Reference:", record.referenceId, (error as Error).message);
    }
  }

  // 3. Try Twilio WhatsApp API (if Twilio credentials provided)
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";
  if (twilioSid && twilioAuth) {
    try {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const body = new URLSearchParams({
        From: twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`,
        To: `whatsapp:+${cleanNumber}`,
        Body: formattedWhatsAppText,
      });

      const response = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (response.ok) {
        return {
          status: "sent",
          info: `WhatsApp message dispatched via Twilio to +${cleanNumber}`,
          directWhatsAppUrl,
        };
      }
    } catch (err) {
      console.error("[Twilio WhatsApp Failed] Reference:", record.referenceId, (err as Error).message);
    }
  }

  // 4. Default: WhatsApp recipient configured
  return {
    status: "not_configured",
    info: `WhatsApp destination configured for +${cleanNumber}. One-click direct link generated.`,
    directWhatsAppUrl,
  };
}
