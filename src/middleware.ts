import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Blocklist of suspicious probe paths often scanned by automated vulnerability bots
const BLOCKED_PROBE_PATTERNS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/data\//i,
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/wp-content/i,
  /^\/phpmyadmin/i,
  /^\/xmlrpc\.php/i,
  /^\/\.aws/i,
  /^\/\.ssh/i,
  /^\/backup/i,
  /^\/dump/i,
  /^\/config\.json/i,
  /^\/actuator/i,
  /^\/server-status/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const origin = request.headers.get("origin") || "";

  // 1. Instantly block malicious probes for sensitive dotfiles, database files, and CMS exploits
  for (const pattern of BLOCKED_PROBE_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse("Access Denied: Restricted Path", {
        status: 403,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }

  // 2. Same-Origin CSRF Defense on mutating API requests (POST, PUT, DELETE, PATCH)
  if (
    pathname.startsWith("/api/") &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(request.method)
  ) {
    // If Origin is provided, verify it matches current host
    if (origin) {
      try {
        const originUrl = new URL(origin);
        // Allow localhost and exact host match
        if (originUrl.host !== host && !originUrl.host.startsWith("localhost:") && originUrl.host !== "127.0.0.1") {
          return NextResponse.json(
            { error: "Forbidden: Cross-site request rejected by CSRF origin shield." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Forbidden: Invalid origin header." },
          { status: 403 }
        );
      }
    }
  }

  // 3. Proactive Route Protection for Admin Portal (Edge Redirect)
  if (pathname.startsWith("/admin/enquiries")) {
    const sessionToken = request.cookies.get("lk_staff_session")?.value;
    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Generate response and attach defense-in-depth HTTP Security Headers
  const response = NextResponse.next();

  // Content Security Policy (CSP)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' data: https://fonts.gstatic.com;
    img-src 'self' data: blob: https://images.unsplash.com https://*.google.com https://*.googleusercontent.com https://*.google.co.in https://maps.gstatic.com;
    media-src 'self' blob:;
    connect-src 'self' https://*.googleapis.com https://*.google-analytics.com https://api.callmebot.com https://graph.facebook.com https://api.twilio.com;
    frame-src 'self' https://www.google.com https://maps.google.com;
    frame-ancestors 'none';
    form-action 'self' https://wa.me https://accounts.google.com;
    base-uri 'self';
    object-src 'none';
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
