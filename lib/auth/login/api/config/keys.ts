export const LOGIN_KEYS = {
  all: ['auth', 'login'] as const,
  login: () => [...LOGIN_KEYS.all, 'login'] as const,
} as const;


