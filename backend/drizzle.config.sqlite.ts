import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle-sqlite',
  dialect: 'sqlite',
} satisfies Config;