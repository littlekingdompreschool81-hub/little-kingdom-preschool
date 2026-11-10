import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { SESSION_COOKIE_NAME, signSessionToken } from "@/lib/auth";
import { isEmailAllowed } from "@/lib/db";
import { globalRateLimiter, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Timing-safe string comparison to protect against side-channel timing attacks.
 */
function timingSafeEqualStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Hardened Staff & Admin Sign-in Endpoint.
 * Enforces:
 * 1. IP Rate Limiting & brute-force lockout (5 attempts per 15 min).
 * 2. Strict Server Allowlist verification.
 * 3. Secure Admin/Staff Passcode with constant-time cryptographic verification.
 * 4. User-enumeration defense (generic error responses).
 */
export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimitKey = `auth:login:${clientIp}`;

  // 1. Check Rate Limit (5 attempts per 15 min, 15 min lockout)
  const rateLimit = globalRateLimiter.check(rateLimitKey, 5, 900, 900);
  if (!rateLimit.allowed) {
    const waitMinutes = Math.ceil(rateLimit.resetSeconds / 60);
    return NextResponse.json(
      {
        success: false,
        error: "rate_limited",
        message: `Too many unsuccessful sign-in attempts. For school security, access has been temporarily locked for ${waitMinutes} minute(s).`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetSeconds),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const rawEmail = body.email?.trim().toLowerCase();
    const rawPasscode = body.passcode?.trim();

    if (!rawEmail || !rawPasscode) {
      return NextResponse.json(
        { success: false, message: "Both email and staff access passcode are required." },
        { status: 400 }
      );
    }

    // 2. Expected passcode from environment variables
    const expectedPasscode =
      process.env.ADMIN_ACCESS_CODE ||
      process.env.STAFF_PASSCODE ||
      "LittleKingdom@2026";

    // Timing-safe check on passcode
    const isPasscodeValid = timingSafeEqualStrings(rawPasscode, expectedPasscode);

    // 3. Allowlist check
    const allowCheck = isEmailAllowed(rawEmail);

    // Uniform failure response to prevent account enumeration
    if (!isPasscodeValid || !allowCheck.allowed) {
      // Artificial delay (100-200ms) to smooth timing variations
      await new Promise((r) => setTimeout(r, 150));
      return NextResponse.json(
        {
          success: false,
          error: "invalid_credentials",
          message: "Invalid credentials or unauthorized account. Please check your email and passcode.",
        },
        { status: 401 }
      );
    }

    // 4. Success: Reset rate limit for this IP
    globalRateLimiter.reset(rateLimitKey);

    const effectiveRole = allowCheck.role || "staff";
    const displayName =
      allowCheck.name ||
      (effectiveRole === "admin" ? "School Administrator" : "Preschool Staff");

    // 5. Generate cryptographically signed HMAC token
    const token = signSessionToken({
      email: rawEmail,
      name: displayName,
      role: effectiveRole,
    });

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
      user: {
        email: rawEmail,
        name: displayName,
        role: effectiveRole,
      },
    });

    // 6. Set hardened HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (err) {
    console.error("[Login Auth Error]", (err as Error).message);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
