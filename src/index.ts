import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { apiRoutes } from "./api";

export const app = new Elysia().use(swagger()).use(apiRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
