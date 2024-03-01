import { middleware } from "@/middleware";
import { authRoutes } from "./auth";
import { userRoutes } from "./users";
import { Elysia } from "elysia";
import { InvalidSession } from "@/lib/utils";

export const apiRoutes = new Elysia({ prefix: "/api" })
  .use(middleware)
  .error({
    INVALID_SESSION: InvalidSession,
  })
  .guard(
    {
      beforeHandle: ({ user }) => {
        if (!user) throw new InvalidSession();
      },
    },
    (app) => app.get("/profile", (context) => context.user)
  )
  .use(authRoutes);
