type LoginAttempt = {
  failedAttempts: number;
  lockedUntil: number | null;
  lastAttempt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000; // 5 minutes

export function isLoginBlocked(ip: string) {
  const attempt = loginAttempts.get(ip);

  if (!attempt) {
    return false;
  }

  if (!attempt.lockedUntil) {
    return false;
  }

  if (Date.now() >= attempt.lockedUntil) {
    loginAttempts.delete(ip);
    return false;
  }

  return true;
}

export function recordFailedLogin(ip: string) {
  const existing = loginAttempts.get(ip);

  const failedAttempts = (existing?.failedAttempts ?? 0) + 1;

  loginAttempts.set(ip, {
    failedAttempts,
    lastAttempt: Date.now(),
    lockedUntil: failedAttempts >= MAX_ATTEMPTS ? Date.now() + LOCK_TIME : null,
  });
}

export function clearLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}
