import { type EnquiryRecord } from "../validation";
import nodemailer from "nodemailer";

export interface EmailDispatchResult {
  status: "sent" | "not_configured" | "failed";
  info: string;
}

/**
 * Server-side transactional email dispatcher for school enquiries.
 * Recipients default to Little Kingdom Preschool official email:
 * littlekingdompreschool81@gmail.com
 */
export async function sendEnquiryEmailNotification(
  record: EnquiryRecord
): Promise<EmailDispatchResult> {
  const recipient =
    process.env.SCHOOL_NOTIFICATION_EMAIL || "littlekingdompreschool81@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || (process.env.SMTP_PASS ? "littlekingdompreschool81@gmail.com" : undefined);
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  // Format date nicely in Indian Standard Time (IST)
  const submissionTime = new Date(record.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const subject = `[New Admission Enquiry] ${record.studentName} — ${record.classInterestedIn} (${record.referenceId})`;

  const plainText = `================================================
NEW ADMISSION ENQUIRY — LITTLE KINGDOM PRESCHOOL
================================================

A new admission enquiry was submitted on the website.

STUDENT & CLASS DETAILS:
• Student Name:       ${record.studentName}
• Program / Class:    ${record.classInterestedIn}
• Preferred Campus:   ${record.preferredBranch || "Either / Nearest Branch"}
• Reference ID:       ${record.referenceId}

PARENT / GUARDIAN CONTACT:
• Parent Name:        ${record.parentName}
• Phone Number:       ${record.phone}
• Email Address:      ${record.email || "Not provided"}

PARENT MESSAGE / QUERY:
${record.message ? `"${record.message}"` : "(No additional message entered)"}

SUBMISSION DETAILS:
• Date & Time:        ${submissionTime} (IST)
• Record ID:          ${record.id}

================================================
You can view and export all enquiries in the Staff Portal:
http://localhost:3000/admin/enquiries
================================================`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFDF9; color: #1E293B;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; border: 2px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <!-- Header -->
    <tr>
      <td style="padding: 24px 32px; background: linear-gradient(135deg, #E0F2FE 0%, #FEF3C7 50%, #DCFCE7 100%); border-bottom: 2px solid #E2E8F0;">
        <span style="display: inline-block; padding: 4px 12px; background-color: #0284C7; color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
          New Admission Enquiry
        </span>
        <h1 style="margin: 4px 0 0 0; font-size: 22px; font-weight: 900; color: #0F172A;">
          Little Kingdom Preschool
        </h1>
        <p style="margin: 2px 0 0 0; font-size: 12px; color: #0369A1; font-weight: 700;">
          Motto: &ldquo;Little Mind Big Dreams&rdquo; • Learning by Doing
        </p>
      </td>
    </tr>

    <!-- Reference Alert -->
    <tr>
      <td style="padding: 16px 32px; background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <table width="100%">
          <tr>
            <td style="font-size: 12px; color: #64748B;">
              Application Ref ID: <strong style="font-family: monospace; font-size: 13px; color: #0369A1; background: #E0F2FE; padding: 2px 8px; border-radius: 6px;">${record.referenceId}</strong>
            </td>
            <td align="right" style="font-size: 11px; color: #94A3B8;">
              ${submissionTime}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Details Body -->
    <tr>
      <td style="padding: 28px 32px;">
        <!-- Student Info -->
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #0284C7; font-weight: 800; margin: 0 0 12px 0; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">
          👶 Student & Class Details
        </h2>
        <table width="100%" style="margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td width="35%" style="padding: 6px 0; color: #64748B;">Student Name:</td>
            <td style="padding: 6px 0; font-weight: 800; color: #0F172A; font-size: 16px;">${record.studentName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Program / Class:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #FEF3C7; color: #92400E; font-weight: 800; border-radius: 8px; font-size: 13px;">
                ${record.classInterestedIn}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Preferred Campus:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0F172A;">
              ${record.preferredBranch || "Either / Nearest Branch"}
            </td>
          </tr>
        </table>

        <!-- Parent Info -->
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #059669; font-weight: 800; margin: 0 0 12px 0; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">
          👤 Parent / Guardian Details
        </h2>
        <table width="100%" style="margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td width="35%" style="padding: 6px 0; color: #64748B;">Parent Name:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0F172A;">${record.parentName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Phone Number:</td>
            <td style="padding: 6px 0; font-weight: 800; color: #0284C7; font-size: 15px;">
              <a href="tel:${record.phone}" style="color: #0284C7; text-decoration: none;">📞 ${record.phone}</a>
              <a href="https://wa.me/${record.phone.replace(/[^0-9]/g, '')}" style="margin-left: 10px; font-size: 11px; color: #059669; text-decoration: underline;">Open WhatsApp</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Email Address:</td>
            <td style="padding: 6px 0; color: #0F172A;">
              ${record.email ? `<a href="mailto:${record.email}" style="color: #0284C7; text-decoration: underline;">${record.email}</a>` : '<span style="color: #94A3B8; font-style: italic;">Not provided</span>'}
            </td>
          </tr>
        </table>

        <!-- Message -->
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #E11D48; font-weight: 800; margin: 0 0 12px 0; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">
          📝 Message / Notes
        </h2>
        <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; font-size: 13px; color: #334155; line-height: 1.6; font-style: ${record.message ? 'normal' : 'italic'};">
          ${record.message ? record.message : "No additional note was entered by the parent."}
        </div>

        <!-- Call to Action -->
        <div style="margin-top: 28px; text-align: center;">
          <a href="tel:${record.phone}" style="display: inline-block; padding: 12px 28px; background-color: #0284C7; color: #FFFFFF; font-weight: 800; font-size: 13px; text-decoration: none; border-radius: 12px; margin-right: 8px;">
            📞 Call Parent (${record.phone})
          </a>
          <a href="https://wa.me/917039015296" style="display: inline-block; padding: 12px 24px; background-color: #059669; color: #FFFFFF; font-weight: 800; font-size: 13px; text-decoration: none; border-radius: 12px;">
            💬 Open School WhatsApp
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 16px 32px; background-color: #F1F5F9; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #64748B;">
        <p style="margin: 0;">This automated alert was dispatched by the Little Kingdom Preschool website.</p>
        <p style="margin: 4px 0 0 0;">Recipient: <strong>${recipient}</strong> • Staff Portal: <a href="http://localhost:3000/admin/enquiries" style="color: #0284C7;">View All Enquiries</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // 1. Try Nodemailer / Gmail SMTP if credentials provided
  if (smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser || "littlekingdompreschool81@gmail.com",
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `Little Kingdom Preschool <${smtpUser || "littlekingdompreschool81@gmail.com"}>`,
        to: recipient,
        replyTo: record.email || undefined,
        subject,
        text: plainText,
        html: htmlBody,
      });

      return {
        status: "sent",
        info: `Notification successfully emailed to ${recipient} via Gmail SMTP`,
      };
    } catch (smtpErr) {
      console.error("[Gmail SMTP Failed] Reference:", record.referenceId, (smtpErr as Error).message);
    }
  }

  // 2. Try Resend API if API Key provided
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "admissions@littlekingdompreschool.com",
          to: recipient,
          subject,
          text: plainText,
          html: htmlBody,
        }),
      });

      if (response.ok) {
        return {
          status: "sent",
          info: `Notification successfully dispatched to ${recipient} via Resend`,
        };
      }
    } catch (resendErr) {
      console.error("[Resend API Failed] Reference:", record.referenceId, (resendErr as Error).message);
    }
  }

  // 3. Try Webhook if URL provided
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "admission_enquiry",
          recipient,
          record,
          text: plainText,
        }),
      });
      return {
        status: "sent",
        info: `Notification forwarded to webhook: ${webhookUrl}`,
      };
    } catch (hookErr) {
      console.error("[Webhook Failed] Reference:", record.referenceId, (hookErr as Error).message);
    }
  }

  // 4. Default: Configured recipient is ready, credentials pending
  return {
    status: "not_configured",
    info: `Email recipient set to ${recipient}. To enable automatic direct delivery, add GMAIL_APP_PASSWORD (or RESEND_API_KEY) in .env.local.`,
  };
}
