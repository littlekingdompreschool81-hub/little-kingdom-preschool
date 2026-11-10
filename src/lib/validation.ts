import { z } from "zod";

/**
 * Sanitizes input text by removing null bytes, malicious control characters,
 * and normalizing excessive whitespace.
 */
export function sanitizePlainText(input: string | null | undefined): string {
  if (!input) return "";
  return input
    // Remove null bytes and non-printable control characters (except newline, tab, carriage return)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    // Strip HTML/XML tags from plain text inputs to prevent injection attacks
    .replace(/<[^>]*>/g, "")
    .trim();
}

/**
 * HTML Entity Encoder to prevent Cross-Site Scripting (XSS) and HTML injection
 * when displaying or sending text in HTML templates (e.g. emails, logs, web views).
 */
export function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const PreschoolEnquirySchema = z.object({
  parentName: z
    .string()
    .trim()
    .transform(sanitizePlainText)
    .pipe(
      z
        .string()
        .min(2, "Parent/guardian name is required (minimum 2 characters)")
        .max(100, "Name must not exceed 100 characters")
    ),
  studentName: z
    .string()
    .trim()
    .transform(sanitizePlainText)
    .pipe(
      z
        .string()
        .min(2, "Student name is required (minimum 2 characters)")
        .max(100, "Name must not exceed 100 characters")
    ),
  phone: z
    .string()
    .trim()
    .transform((val) => sanitizePlainText(val).replace(/[^\d+\-\s()]/g, ""))
    .pipe(
      z
        .string()
        .min(7, "Contact number is required (minimum 7 digits)")
        .max(20, "Contact number must not exceed 20 characters")
        .regex(/^[+0-9\s\-()]+$/, "Please enter a valid phone number")
    ),
  email: z
    .string()
    .trim()
    .transform(sanitizePlainText)
    .pipe(
      z
        .string()
        .email("Please provide a valid email address")
        .max(120, "Email must not exceed 120 characters")
        .optional()
        .or(z.literal(""))
    ),
  classInterestedIn: z.enum(["Play Group", "Nursery", "Junior KG", "Senior KG"], {
    errorMap: () => ({ message: "Please select a valid class: Play Group, Nursery, Junior KG, or Senior KG" }),
  }),
  preferredBranch: z
    .string()
    .trim()
    .transform(sanitizePlainText)
    .pipe(
      z
        .string()
        .max(80, "Branch selection too long")
        .optional()
        .default("Either / Nearest Branch")
    ),
  message: z
    .string()
    .trim()
    .transform(sanitizePlainText)
    .pipe(
      z
        .string()
        .max(1000, "Message cannot exceed 1000 characters")
        .optional()
        .or(z.literal(""))
    ),
  // Honeypot field for spam prevention - bots fill this in, humans leave empty
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type PreschoolEnquiryInput = z.infer<typeof PreschoolEnquirySchema>;

export interface EnquiryRecord {
  id: string;
  referenceId: string;
  parentName: string;
  studentName: string;
  phone: string;
  email: string | null;
  classInterestedIn: "Play Group" | "Nursery" | "Junior KG" | "Senior KG";
  preferredBranch?: string | null;
  message: string | null;
  createdAt: string;
  emailNotificationStatus: "pending" | "sent" | "not_configured" | "failed";
  whatsappNotificationStatus: "pending" | "sent" | "not_configured" | "failed";
}

export interface EnquirySubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  notificationSummary?: {
    emailStatus: "sent" | "not_configured" | "failed";
    whatsappStatus: "sent" | "not_configured" | "failed";
    details: string;
    directWhatsAppUrl?: string;
  };
}
