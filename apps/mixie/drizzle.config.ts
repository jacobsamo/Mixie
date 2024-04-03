import { type Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/server/db/schemas/",
  out: "./supabase/migrations",
  driver: "pg",
  dbCredentials: { connectionString: process.env.SUPABASE_URI! },
} satisfies Config;
