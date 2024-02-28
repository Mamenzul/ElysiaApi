import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

import { Database } from "bun:sqlite";

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { InferSelectModel } from "drizzle-orm";

const sqliteDB = new Database(":memory:");
export const db = drizzle(sqliteDB);

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export type Users = InferSelectModel<typeof userTable>;

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
