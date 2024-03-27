import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { apiRoutes } from "./api";
import { env } from "./env";

export const app = new Elysia().use(swagger()).use(apiRoutes).get('/', async (ctx) => {
  return {
    status: 'success',
    message: 'Welcome to Elysia',
  };
})
.get('/health', (ctx) => 'ok');

app.listen({ port: env.PORT }, ({ hostname, port }) => {
  const url = env.NODE_ENV === 'production' ? 'https' : 'http';
  console.log(`🦊 Elysia is running at ${url}://${hostname}:${port}`);
});
