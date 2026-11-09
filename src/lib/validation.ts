import { z } from "zod";

export const PreschoolEnquirySchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(2, "Parent/guardian name is required (minimum 2 characters)")
    .max(100, "Name must not exceed 100 characters"),
  studentName: z
    .string()
    .trim()
    .min(2, "Student name is required (minimum 2 characters)")
    .max(100, "Name must not exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Contact number is required (minimum 7 digits)")
    .max(20, "Contact number must not exceed 20 characters")
    .regex(/^[+0-9\s\-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  classInterestedIn: z.enum(["Play Group", "Nursery", "Junior KG", "Senior KG"], {
    errorMap: () => ({ message: "Please select a valid class: Play Group, Nursery, Junior KG, or Senior KG" }),
  }),
  preferredBranch: z
    .string()
    .trim()
    .optional()
    .default("Either / Nearest Branch"),
  message: z
    .string()
    .trim()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
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
  };
}
