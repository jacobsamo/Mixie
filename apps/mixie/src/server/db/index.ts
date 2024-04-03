import { drizzle } from "drizzle-orm/postgres-js";
import {env} from "@/../env.mjs";
import postgres from "postgres";

export * from "./schemas";


const client = postgres(env.SUPABASE_URI);


const db = drizzle(client);

export default db;
