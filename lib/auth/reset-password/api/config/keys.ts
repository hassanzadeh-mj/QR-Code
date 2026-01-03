export const RESET_PASSWORD_KEYS = {
  all: ['auth', 'reset-password'] as const,
  reset: () => [...RESET_PASSWORD_KEYS.all, 'reset'] as const,
} as const;

