import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getGoogleOAuthUrl, CSRF_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/callback/google`;
  const state = crypto.randomBytes(24).toString("hex");

  const authUrl = getGoogleOAuthUrl(redirectUri, state);

  if (!authUrl) {
    return NextResponse.json(
      {
        error: "Google OAuth credentials not configured.",
        message:
          "Please configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your server environment variables (.env.local) to enable Google Sign-In.",
      },
      { status: 503 }
    );
  }

  const response = NextResponse.redirect(authUrl);

  // Set secure CSRF state cookie (5 minutes expiration)
  response.cookies.set({
    name: CSRF_COOKIE_NAME,
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 300,
  });

  return response;
}
