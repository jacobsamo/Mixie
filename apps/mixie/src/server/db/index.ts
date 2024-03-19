import { drizzle } from "drizzle-orm/postgres-js";
import env from "env";
import postgres from "postgres";

export * from "./schemas";


const client = postgres(env.SUPABASE_URI, { prepare: false });


const db = drizzle(client);

export default db;
