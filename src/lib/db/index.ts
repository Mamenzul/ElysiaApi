import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";
import { userTable, sessionTable } from "./schema";

const sqliteDB = new Database(":memory:");
export const db = drizzle(sqliteDB, { schema });

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
