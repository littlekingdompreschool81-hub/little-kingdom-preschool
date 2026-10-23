import { z } from "zod";

export const AdmissionEnquirySchema = z.object({
  studentName: z
    .string()
    .min(2, "Student full name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  parentName: z
    .string()
    .min(2, "Parent/Guardian name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number must not exceed 20 digits")
    .regex(/^[+0-9\s\-()]+$/, "Phone number format contains invalid characters"),
  gradeApplying: z
    .string()
    .min(1, "Please select the grade level you are applying for"),
  academicYear: z
    .string()
    .min(1, "Please select the intended academic session"),
  visitPreference: z
    .enum(["in-person", "virtual", "undecided"])
    .default("in-person"),
  message: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type AdmissionEnquiryInput = z.infer<typeof AdmissionEnquirySchema>;

export interface EnquirySubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  devNotice?: string;
}
