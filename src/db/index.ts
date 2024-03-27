import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { userTable, sessionTable } from "./schema";
import { env } from "@/env";

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});
export const db = drizzle(client, { schema });

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
