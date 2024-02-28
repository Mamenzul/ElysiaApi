import { Elysia } from "elysia";
import { loginRoutes } from "./login";
import { signupRoutes } from "./signup";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(loginRoutes)
  .use(signupRoutes);
