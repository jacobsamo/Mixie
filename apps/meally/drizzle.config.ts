import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { env } from './env.mjs';

const config: Config = {
  schema: './src/db/schemas/',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
};

export default config;
