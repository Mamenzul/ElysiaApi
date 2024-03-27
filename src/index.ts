import staticPlugin from '@elysiajs/static';
import { app } from './app';
import { env } from './env';
import Elysia from 'elysia';

const server = new Elysia()
  // Plugins that aren't compatible with the edge
  .use(staticPlugin())

  // Routes
  .use(app);

server.listen({ port: env.PORT }, ({ hostname, port }) => {
  const url = env.NODE_ENV === 'production' ? 'https' : 'http';

  console.log(`🦊 Elysia is running at ${url}://${hostname}:${port}`);
});