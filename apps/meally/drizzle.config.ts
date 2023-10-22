import { type Config } from "drizzle-kit";
import { env } from "./env.mjs";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/server/db/schemas/",
  out: "./src/server/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
