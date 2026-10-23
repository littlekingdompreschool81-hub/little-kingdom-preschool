import { NextRequest, NextResponse } from "next/server";
import { getServerStaffSession } from "@/lib/auth";
import { listStaffAllowlist, addStaffEmail, removeStaffEmail } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
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

  const list = listStaffAllowlist();
  return NextResponse.json({ success: true, allowlist: list });
}

export async function POST(req: NextRequest) {
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
    const { email, name, role, notes } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    addStaffEmail(
      session.user.email,
      email,
      name || "Preschool Staff",
      role === "admin" ? "admin" : "staff",
      notes
    );

    return NextResponse.json({
      success: true,
      message: `Successfully granted ${role || "staff"} access to ${email}.`,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
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
    const emailToRemove = searchParams.get("email");

    if (!emailToRemove) {
      return NextResponse.json({ error: "Email query param is required." }, { status: 400 });
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
