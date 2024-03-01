import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    authToken: env.DB_AUTH_TOKEN,
    url: env.DB_URL,
  },
} satisfies Config;
