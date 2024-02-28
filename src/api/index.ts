import { authRoutes } from './auth';
import { userRoutes } from './users';
import { Elysia } from 'elysia';

export const apiRoutes = new Elysia({prefix: '/api'})
  .use(authRoutes)
  .use(userRoutes)
  .get('/ping', () => 'pong');

