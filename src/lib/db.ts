import fs from "fs";
import path from "path";
import { type EnquiryRecord } from "./validation";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "enquiries.db");
const jsonFallbackPath = path.join(dataDir, "enquiries.json");
const allowlistFallbackPath = path.join(dataDir, "allowlist.json");

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

    CREATE TABLE IF NOT EXISTS staff_allowlist (
      email TEXT PRIMARY KEY COLLATE NOCASE,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'staff',
      added_by TEXT NOT NULL,
      added_at TEXT NOT NULL,
      notes TEXT
    );
  `);

  try {
    sqliteDb.exec(`ALTER TABLE enquiries ADD COLUMN preferred_branch TEXT;`);
  } catch {
    // Column already exists
  }
} catch (err) {
  console.warn("[Database Notice] Native node:sqlite not initialized, using JSON store fallback:", (err as Error).message);
}

export interface StaffAllowlistEntry {
  email: string;
  name: string;
  role: "admin" | "staff";
  addedBy: string;
  addedAt: string;
  notes?: string;
}

/**
 * Seeds initial staff allowlist from environment variables if table is empty.
 * If no admin or allowlist is configured, system fails closed.
 */
export function seedInitialAllowlist(): void {
  try {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const envStaffList = process.env.STAFF_ALLOWLIST
      ? process.env.STAFF_ALLOWLIST.split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean)
      : [];

    if (sqliteDb) {
      const count = sqliteDb.prepare("SELECT COUNT(*) AS c FROM staff_allowlist").get()?.c || 0;
      if (count === 0) {
        const insertStmt = sqliteDb.prepare(`
          INSERT OR IGNORE INTO staff_allowlist (email, name, role, added_by, added_at, notes)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        const now = new Date().toISOString();

        if (adminEmail) {
          insertStmt.run(adminEmail, "School Administrator", "admin", "system_init", now, "Configured via ADMIN_EMAIL");
        }

        for (const staffEmail of envStaffList) {
          if (staffEmail !== adminEmail) {
            insertStmt.run(staffEmail, "Preschool Staff", "staff", "system_init", now, "Configured via STAFF_ALLOWLIST");
          }
        }
      }
    } else {
      // JSON fallback
      if (!fs.existsSync(allowlistFallbackPath)) {
        const initialList: StaffAllowlistEntry[] = [];
        const now = new Date().toISOString();
        if (adminEmail) {
          initialList.push({
            email: adminEmail,
            name: "School Administrator",
            role: "admin",
            addedBy: "system_init",
            addedAt: now,
            notes: "Configured via ADMIN_EMAIL",
          });
        }
        for (const staffEmail of envStaffList) {
          if (staffEmail !== adminEmail) {
            initialList.push({
              email: staffEmail,
              name: "Preschool Staff",
              role: "staff",
              addedBy: "system_init",
              addedAt: now,
              notes: "Configured via STAFF_ALLOWLIST",
            });
          }
        }
        fs.writeFileSync(allowlistFallbackPath, JSON.stringify(initialList, null, 2), "utf8");
      }
    }
  } catch (err) {
    console.error("[Allowlist Seed Error]", (err as Error).message);
  }
}

// Call seed once on module load
seedInitialAllowlist();

/**
 * Check if an email address is authorized in the server allowlist
 */
export function isEmailAllowed(rawEmail: string): { allowed: boolean; role?: "admin" | "staff"; name?: string } {
  if (!rawEmail) return { allowed: false };
  const normalized = rawEmail.trim().toLowerCase();

  // Also check direct ADMIN_EMAIL match as hardcoded server failsafe
  const envAdmin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (envAdmin && normalized === envAdmin) {
    return { allowed: true, role: "admin", name: "School Administrator" };
  }

  try {
    if (sqliteDb) {
      const row = sqliteDb
        .prepare("SELECT email, name, role FROM staff_allowlist WHERE email = ?")
        .get(normalized);
      if (row) {
        return {
          allowed: true,
          role: (row.role as "admin" | "staff") || "staff",
          name: row.name || undefined,
        };
      }
    } else {
      if (fs.existsSync(allowlistFallbackPath)) {
        const list: StaffAllowlistEntry[] = JSON.parse(fs.readFileSync(allowlistFallbackPath, "utf8"));
        const match = list.find((item) => item.email.toLowerCase() === normalized);
        if (match) {
          return { allowed: true, role: match.role, name: match.name };
        }
      }
    }
  } catch (err) {
    console.error("[Allowlist Check Error]", (err as Error).message);
  }

  // Deny by default (fail closed)
  return { allowed: false };
}

/**
 * Returns all allowlisted staff accounts (admin-only function)
 */
export function listStaffAllowlist(): StaffAllowlistEntry[] {
  try {
    if (sqliteDb) {
      const rows = sqliteDb
        .prepare("SELECT email, name, role, added_by AS addedBy, added_at AS addedAt, notes FROM staff_allowlist ORDER BY added_at DESC")
        .all();
      return rows as StaffAllowlistEntry[];
    } else {
      if (fs.existsSync(allowlistFallbackPath)) {
        return JSON.parse(fs.readFileSync(allowlistFallbackPath, "utf8"));
      }
      return [];
    }
  } catch (err) {
    console.error("[Allowlist List Error]", (err as Error).message);
    return [];
  }
}

/**
 * Adds an email to the allowlist (admin-only)
 */
export function addStaffEmail(
  adminEmail: string,
  emailToAdd: string,
  name: string,
  role: "admin" | "staff" = "staff",
  notes?: string
): boolean {
  const adminCheck = isEmailAllowed(adminEmail);
  if (!adminCheck.allowed || adminCheck.role !== "admin") {
    throw new Error("Unauthorized: Only verified administrators can add staff emails.");
  }

  const normalized = emailToAdd.trim().toLowerCase();
  const now = new Date().toISOString();

  if (sqliteDb) {
    sqliteDb.prepare(`
      INSERT INTO staff_allowlist (email, name, role, added_by, added_at, notes)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        name = excluded.name,
        role = excluded.role,
        notes = excluded.notes
    `).run(normalized, name.trim(), role, adminEmail.toLowerCase(), now, notes || null);
    return true;
  } else {
    let list: StaffAllowlistEntry[] = [];
    if (fs.existsSync(allowlistFallbackPath)) {
      list = JSON.parse(fs.readFileSync(allowlistFallbackPath, "utf8"));
    }
    const idx = list.findIndex((i) => i.email.toLowerCase() === normalized);
    const entry: StaffAllowlistEntry = {
      email: normalized,
      name: name.trim(),
      role,
      addedBy: adminEmail.toLowerCase(),
      addedAt: now,
      notes,
    };
    if (idx >= 0) {
      list[idx] = entry;
    } else {
      list.push(entry);
    }
    fs.writeFileSync(allowlistFallbackPath, JSON.stringify(list, null, 2), "utf8");
    return true;
  }
}

/**
 * Revokes an email from the allowlist (admin-only)
 */
export function removeStaffEmail(adminEmail: string, emailToRemove: string): boolean {
  const adminCheck = isEmailAllowed(adminEmail);
  if (!adminCheck.allowed || adminCheck.role !== "admin") {
    throw new Error("Unauthorized: Only verified administrators can revoke staff access.");
  }

  const normalized = emailToRemove.trim().toLowerCase();
  if (normalized === adminEmail.trim().toLowerCase()) {
    throw new Error("Security Violation: An administrator cannot remove their own access.");
  }

  if (sqliteDb) {
    sqliteDb.prepare("DELETE FROM staff_allowlist WHERE email = ?").run(normalized);
    return true;
  } else {
    if (fs.existsSync(allowlistFallbackPath)) {
      let list: StaffAllowlistEntry[] = JSON.parse(fs.readFileSync(allowlistFallbackPath, "utf8"));
      list = list.filter((i) => i.email.toLowerCase() !== normalized);
      fs.writeFileSync(allowlistFallbackPath, JSON.stringify(list, null, 2), "utf8");
    }
    return true;
  }
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
          class_interested_in, preferred_branch, message, created_at, email_status, whatsapp_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        record.id,
        record.referenceId,
        record.parentName,
        record.studentName,
        record.phone,
        record.email || null,
        record.classInterestedIn,
        record.preferredBranch || "Either / Nearest Branch",
        record.message || null,
        record.createdAt,
        record.emailNotificationStatus,
        record.whatsappNotificationStatus
      );
    } else {
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

/**
 * Retrieves all stored enquiry records sorted by submission date (newest first)
 * MUST ONLY be called after server-side authorization check!
 */
export async function getEnquiries(): Promise<EnquiryRecord[]> {
  try {
    if (sqliteDb) {
      const rows = sqliteDb
        .prepare(`
          SELECT 
            id,
            reference_id AS referenceId,
            parent_name AS parentName,
            student_name AS studentName,
            phone,
            email,
            class_interested_in AS classInterestedIn,
            COALESCE(preferred_branch, 'Either / Nearest Branch') AS preferredBranch,
            message,
            created_at AS createdAt,
            email_status AS emailNotificationStatus,
            whatsapp_status AS whatsappNotificationStatus
          FROM enquiries
          ORDER BY created_at DESC
        `)
        .all();
      return rows as EnquiryRecord[];
    } else {
      if (fs.existsSync(jsonFallbackPath)) {
        const data = JSON.parse(fs.readFileSync(jsonFallbackPath, "utf8"));
        return data.reverse();
      }
      return [];
    }
  } catch (err) {
    console.error("[Database Read Error]", (err as Error).message);
    return [];
  }
}
