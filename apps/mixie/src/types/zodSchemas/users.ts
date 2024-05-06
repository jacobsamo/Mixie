import { createInsertSchema } from "drizzle-zod";
import { users } from "@/server/db/schemas";

export const userSchema = createInsertSchema(users);
