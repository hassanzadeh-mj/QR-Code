export const SIGNUP_KEYS = {
  all: ['auth', 'signup'] as const,
  signup: () => [...SIGNUP_KEYS.all, 'signup'] as const,
} as const;



