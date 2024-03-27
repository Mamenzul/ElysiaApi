import { middleware } from "@/middleware";
import { authRoutes } from "./auth";
import { Elysia } from "elysia";
import { BadCredentials, InvalidSession } from "@/app/lib/utils";

export const apiRoutes = new Elysia({ prefix: "/api" })
  .use(middleware)
  .error({
    INVALID_SESSION: InvalidSession,
    BAD_CREDENTIALS: BadCredentials,
  })
  .onError(({ code, error }) => {
    switch (code) {
      case "BAD_CREDENTIALS":
        return error;
    }
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
