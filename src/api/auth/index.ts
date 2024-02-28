import { Elysia } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" }).get(
  "/ping",
  () => "pong"
);
