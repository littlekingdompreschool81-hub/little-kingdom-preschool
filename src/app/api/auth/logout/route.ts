import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, CSRF_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

function clearSessionResponse(req: Request) {
  const origin = new URL(req.url).origin;
  const response = NextResponse.redirect(`${origin}/admin/login`, { status: 303 });

  // Clear session cookie
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
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
    expires: new Date(0),
  });

  return response;
}

export async function POST(req: Request) {
  return clearSessionResponse(req);
}

export async function GET(req: Request) {
  return clearSessionResponse(req);
}
