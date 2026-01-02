export const VERIFY_EMAIL_KEYS = {
  all: ['auth', 'verify-email'] as const,
  verify: () => [...VERIFY_EMAIL_KEYS.all, 'verify'] as const,
} as const;


