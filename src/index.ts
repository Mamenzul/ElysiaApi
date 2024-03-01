import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { apiRoutes } from "./api";
import { middleware } from "./middleware";

const app = new Elysia().use(swagger()).use(apiRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
