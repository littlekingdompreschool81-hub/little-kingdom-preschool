import { NextRequest, NextResponse } from "next/server";
import { getServerStaffSession } from "@/lib/auth";
import { listStaffAllowlist, addStaffEmail, removeStaffEmail } from "@/lib/db";
import { sanitizePlainText } from "@/lib/validation";
import { globalRateLimiter, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimit = globalRateLimiter.check(`admin:allowlist:${clientIp}`, 30, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const session = await getServerStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator role required to view staff allowlist." },
      { status: 403 }
    );
  }

  const list = listStaffAllowlist();
  return NextResponse.json({ success: true, allowlist: list });
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimit = globalRateLimiter.check(`admin:allowlist:mutate:${clientIp}`, 15, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const session = await getServerStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator role required to manage staff allowlist." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = sanitizePlainText(body.name) || "Preschool Staff";
    const role = body.role === "admin" ? "admin" : "staff";
    const notes = sanitizePlainText(body.notes);

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail) || rawEmail.length > 120) {
      return NextResponse.json({ error: "A valid email address (up to 120 characters) is required." }, { status: 400 });
    }

    addStaffEmail(
      session.user.email,
      rawEmail,
      name,
      role,
      notes
    );

    return NextResponse.json({
      success: true,
      message: `Successfully granted ${role} access to ${rawEmail}.`,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimit = globalRateLimiter.check(`admin:allowlist:mutate:${clientIp}`, 15, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const session = await getServerStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator role required to manage staff allowlist." },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const emailToRemove = searchParams.get("email")?.trim().toLowerCase();

    if (!emailToRemove || !emailToRemove.includes("@")) {
      return NextResponse.json({ error: "Valid email query parameter is required." }, { status: 400 });
    }

    removeStaffEmail(session.user.email, emailToRemove);

    return NextResponse.json({
      success: true,
      message: `Successfully revoked staff access from ${emailToRemove}.`,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
