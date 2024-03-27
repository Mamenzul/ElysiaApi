import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";
import { createId } from "@paralleldrive/cuid2";

export const userTable = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export type Users = InferSelectModel<typeof userTable>;
export const usersInsertSchema = createInsertSchema(userTable);

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});