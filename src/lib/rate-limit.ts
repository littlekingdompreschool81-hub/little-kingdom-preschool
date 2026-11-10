/**
 * High-performance in-memory sliding window rate limiter.
 * Protects against DDoS, brute force, credential stuffing, and bot form spam.
 */

interface RateLimitRecord {
  timestamps: number[];
  lockedUntil?: number;
}

class InMemoryRateLimiter {
  private records: Map<string, RateLimitRecord> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Automatically purge stale IP records every 5 minutes to prevent memory leak
    this.cleanupInterval = setInterval(() => {
      this.purgeExpired();
    }, 5 * 60 * 1000);

    // Don't keep Node process alive just for the interval
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Check and consume one rate limit token.
   * @param key Unique identifier (e.g. `ip:endpoint`)
   * @param maxRequests Maximum allowed requests in the time window
   * @param windowSeconds Window length in seconds
   * @param lockoutSeconds Optional lockout penalty if limit exceeded
   */
  public check(
    key: string,
    maxRequests: number,
    windowSeconds: number,
    lockoutSeconds = 0
  ): {
    allowed: boolean;
    remaining: number;
    resetSeconds: number;
    locked: boolean;
  } {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const windowStart = now - windowMs;

    let record = this.records.get(key);

    if (!record) {
      record = { timestamps: [] };
      this.records.set(key, record);
    }

    // Check if key is currently locked out
    if (record.lockedUntil && record.lockedUntil > now) {
      const resetSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetSeconds,
        locked: true,
      };
    }

    // Filter out timestamps older than the sliding window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    // If over limit, trigger lockout if configured
    if (record.timestamps.length >= maxRequests) {
      if (lockoutSeconds > 0) {
        record.lockedUntil = now + lockoutSeconds * 1000;
        const resetSeconds = lockoutSeconds;
        return {
          allowed: false,
          remaining: 0,
          resetSeconds,
          locked: true,
        };
      }

      const oldestTs = record.timestamps[0] || now;
      const resetSeconds = Math.ceil((oldestTs + windowMs - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetSeconds: Math.max(1, resetSeconds),
        locked: false,
      };
    }

    // Record this hit
    record.timestamps.push(now);
    const remaining = Math.max(0, maxRequests - record.timestamps.length);
    const resetSeconds = Math.ceil(windowSeconds);

    return {
      allowed: true,
      remaining,
      resetSeconds,
      locked: false,
    };
  }

  /**
   * Manually reset rate limit for a key (e.g. after successful auth)
   */
  public reset(key: string): void {
    this.records.delete(key);
  }

  private purgeExpired(): void {
    const now = Date.now();
    const maxRetentionMs = 60 * 60 * 1000; // 1 hour max
    for (const [key, record] of this.records.entries()) {
      if (
        (!record.lockedUntil || record.lockedUntil < now) &&
        (record.timestamps.length === 0 ||
          record.timestamps[record.timestamps.length - 1] < now - maxRetentionMs)
      ) {
        this.records.delete(key);
      }
    }
  }
}

// Global singleton rate limiter across requests
export const globalRateLimiter = new InMemoryRateLimiter();

/**
 * Extracts client IP address safely from standard headers
 */
export function getClientIp(headers: Headers): string {
  // Check standard reverse proxy headers
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // Return first (client) IP in the chain
    const clientIp = xForwardedFor.split(",")[0].trim();
    if (clientIp) return clientIp;
  }

  return "127.0.0.1";
}
