export function normalizeString(value: string) {
  return value.trim().toLowerCase();
}

export const PRISMA_ERROR = {
  UNIQUE_CONSTRAINT: 'P2002',
} as const;
