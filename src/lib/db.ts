import fs from "fs";
import path from "path";
import { type EnquiryRecord } from "./validation";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "enquiries.db");
const jsonFallbackPath = path.join(dataDir, "enquiries.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let sqliteDb: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require("node:sqlite");
  sqliteDb = new DatabaseSync(dbPath);
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      reference_id TEXT NOT NULL UNIQUE,
      parent_name TEXT NOT NULL,
      student_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      class_interested_in TEXT NOT NULL,
      message TEXT,
      created_at TEXT NOT NULL,
      email_status TEXT NOT NULL,
      whatsapp_status TEXT NOT NULL
    );
  `);
} catch (err) {
  console.warn("[Database Notice] Native node:sqlite not initialized, using JSON store fallback:", (err as Error).message);
}

/**
 * Persists an enquiry record to database before any notification is attempted
 */
export async function saveEnquiry(record: EnquiryRecord): Promise<boolean> {
  try {
    if (sqliteDb) {
      const stmt = sqliteDb.prepare(`
        INSERT INTO enquiries (
          id, reference_id, parent_name, student_name, phone, email,
          class_interested_in, message, created_at, email_status, whatsapp_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        record.id,
        record.referenceId,
        record.parentName,
        record.studentName,
        record.phone,
        record.email || null,
        record.classInterestedIn,
        record.message || null,
        record.createdAt,
        record.emailNotificationStatus,
        record.whatsappNotificationStatus
      );
    } else {
      // JSON Store Fallback
      let existing: EnquiryRecord[] = [];
      if (fs.existsSync(jsonFallbackPath)) {
        try {
          existing = JSON.parse(fs.readFileSync(jsonFallbackPath, "utf8"));
        } catch {
          existing = [];
        }
      }
      existing.push(record);
      fs.writeFileSync(jsonFallbackPath, JSON.stringify(existing, null, 2), "utf8");
    }
    return true;
  } catch (err) {
    // Safe error logging: no parent/student personal details exposed
    console.error("[Database Error] Failed to persist enquiry ID:", record.referenceId, (err as Error).message);
    throw err;
  }
}

/**
 * Updates notification statuses after dispatch attempts without risking data loss
 */
export async function updateNotificationStatus(
  referenceId: string,
  statuses: {
    emailStatus?: "sent" | "not_configured" | "failed";
    whatsappStatus?: "sent" | "not_configured" | "failed";
  }
): Promise<void> {
  try {
    if (sqliteDb) {
      if (statuses.emailStatus) {
        sqliteDb.prepare("UPDATE enquiries SET email_status = ? WHERE reference_id = ?").run(statuses.emailStatus, referenceId);
      }
      if (statuses.whatsappStatus) {
        sqliteDb.prepare("UPDATE enquiries SET whatsapp_status = ? WHERE reference_id = ?").run(statuses.whatsappStatus, referenceId);
      }
    }
  } catch (err) {
    console.error("[Database Update Warning] Could not update status for:", referenceId, (err as Error).message);
  }
}
