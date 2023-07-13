import * as dotenv from 'dotenv';
import { type Config } from 'drizzle-kit';
import { env } from './env.mjs';

dotenv.config();

export default {
  schema: './src/db/schemas/',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
