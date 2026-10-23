import { NextRequest, NextResponse } from "next/server";
import {
  CSRF_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  exchangeGoogleCodeForTokens,
  fetchGoogleUserProfile,
  signSessionToken,
} from "@/lib/auth";
import { isEmailAllowed } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    console.error("[Google OAuth Callback Error]", error);
    return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error)}`);
  }

  const storedState = req.cookies.get(CSRF_COOKIE_NAME)?.value;
  if (!state || !storedState || state !== storedState) {
    console.error("[Google OAuth CSRF Mismatch]");
    return NextResponse.redirect(`${origin}/admin/login?error=csrf_mismatch`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login?error=missing_code`);
  }

  const redirectUri = `${origin}/api/auth/callback/google`;
  const tokenData = await exchangeGoogleCodeForTokens(code, redirectUri);

  if (!tokenData?.accessToken) {
    return NextResponse.redirect(`${origin}/admin/login?error=token_exchange_failed`);
  }

  const googleProfile = await fetchGoogleUserProfile(tokenData.accessToken);
  if (!googleProfile || !googleProfile.email) {
    return NextResponse.redirect(`${origin}/admin/login?error=profile_fetch_failed`);
  }

  // Mandatory Google Verification check
  if (!googleProfile.email_verified) {
    console.warn("[Google OAuth Unverified Email]", googleProfile.email);
    return NextResponse.redirect(
      `${origin}/admin/access-denied?reason=unverified_google_email&email=${encodeURIComponent(
        googleProfile.email
      )}`
    );
  }

  // Strict Server-Side Email Allowlist Check (Fail closed!)
  const allowCheck = isEmailAllowed(googleProfile.email);
  if (!allowCheck.allowed) {
    console.warn("[Google OAuth Denied - Not in Allowlist]", googleProfile.email);
    const deniedUrl = new URL("/admin/access-denied", origin);
    deniedUrl.searchParams.set("email", googleProfile.email);
    deniedUrl.searchParams.set("reason", "not_in_allowlist");
    return NextResponse.redirect(deniedUrl.toString());
  }

  // Authorized: Create secure session token
  const token = signSessionToken({
    email: googleProfile.email,
    name: googleProfile.name || allowCheck.name || "Preschool Staff",
    role: allowCheck.role || "staff",
    picture: googleProfile.picture,
  });

  const successUrl = new URL("/admin/enquiries", origin);
  const response = NextResponse.redirect(successUrl.toString());

  // Set secure HTTP-only session cookie
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86400, // 24 hours
  });

  // Clear CSRF cookie
  response.cookies.set({
    name: CSRF_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
