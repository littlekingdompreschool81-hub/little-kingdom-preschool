import crypto from "node:crypto";
import { cookies } from "next/headers";
import { isEmailAllowed } from "./db";

export const SESSION_COOKIE_NAME = "lk_staff_session";
export const CSRF_COOKIE_NAME = "lk_oauth_state";

export interface StaffUser {
  email: string;
  name: string;
  role: "admin" | "staff";
  picture?: string;
}

export interface StaffSession {
  user: StaffUser;
  isAdmin: boolean;
  expiresAt: number;
}

interface SessionPayload {
  email: string;
  name: string;
  role: "admin" | "staff";
  picture?: string;
  iat: number;
  exp: number;
}

function getSessionSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    "little-kingdom-preschool-secure-session-key-must-be-set-in-prod-2026"
  );
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return Buffer.from(b64, "base64").toString("utf8");
}

/**
 * Creates a cryptographically signed session token (HMAC-SHA256)
 */
export function signSessionToken(user: StaffUser, durationSeconds = 86400): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email: user.email.toLowerCase(),
    name: user.name,
    role: user.role,
    picture: user.picture,
    iat: now,
    exp: now + durationSeconds,
  };

  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const hmac = crypto.createHmac("sha256", getSessionSecret());
  hmac.update(payloadB64);
  const signature = hmac.digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies the cryptographic token signature and expiration
 */
export function verifySessionToken(token: string): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  try {
    const hmac = crypto.createHmac("sha256", getSessionSecret());
    hmac.update(payloadB64);
    const expectedSig = hmac.digest("base64url");

    // Timing-safe comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(base64UrlDecode(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Server-side session verification.
 * Checks cookie signature AND verifies that the email remains in the server allowlist.
 * If user is revoked or unapproved, fails closed and returns null.
 */
export async function getServerStaffSession(): Promise<StaffSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifySessionToken(token);
    if (!payload) return null;

    // Strict Server-Side Allowlist Re-check
    const allowCheck = isEmailAllowed(payload.email);
    if (!allowCheck.allowed) {
      return null; // Deny access: email not in server allowlist
    }

    const effectiveRole = allowCheck.role || payload.role;

    return {
      user: {
        email: payload.email,
        name: allowCheck.name || payload.name,
        role: effectiveRole,
        picture: payload.picture,
      },
      isAdmin: effectiveRole === "admin",
      expiresAt: payload.exp,
    };
  } catch (err) {
    console.error("[Session Auth Error]", (err as Error).message);
    return null;
  }
}

/**
 * Google OAuth 2.0 Helpers
 */
export function getGoogleOAuthUrl(redirectUri: string, state: string): string | null {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  if (!clientId) return null;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCodeForTokens(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; idToken?: string } | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[Google Token Exchange Failed]", errText);
    return null;
  }

  const data = await res.json();
  return {
    accessToken: data.access_token,
    idToken: data.id_token,
  };
}

export async function fetchGoogleUserProfile(
  accessToken: string
): Promise<{ email: string; email_verified: boolean; name: string; picture?: string } | null> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    console.error("[Google UserInfo Failed]", res.status);
    return null;
  }

  return await res.json();
}
