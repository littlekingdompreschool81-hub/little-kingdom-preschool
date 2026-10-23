import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, signSessionToken } from "@/lib/auth";
import { isEmailAllowed } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Local/Admin demonstration sign-in endpoint.
 * Note: Still enforces strict server allowlist! Fails closed if email is not authorized.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = body.email?.trim().toLowerCase();

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    // Strict Allowlist Check
    const allowCheck = isEmailAllowed(rawEmail);
    if (!allowCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "forbidden",
          message: `Access Denied: "${rawEmail}" is not in the server allowlist. Only approved school personnel can access this portal.`,
        },
        { status: 403 }
      );
    }

    // Allowed: generate session
    const token = signSessionToken({
      email: rawEmail,
      name: allowCheck.name || (allowCheck.role === "admin" ? "School Administrator" : "Preschool Staff"),
      role: allowCheck.role || "staff",
    });

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully via server allowlist check.",
      user: {
        email: rawEmail,
        name: allowCheck.name || (allowCheck.role === "admin" ? "School Administrator" : "Preschool Staff"),
        role: allowCheck.role || "staff",
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: (err as Error).message },
      { status: 500 }
    );
  }
}
