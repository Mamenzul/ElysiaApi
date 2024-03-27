import { swagger } from '@elysiajs/swagger';
import { Elysia } from "elysia";
import { apiRoutes } from "./api";

export const app = new Elysia()
  .use(swagger())
  .use(apiRoutes);
