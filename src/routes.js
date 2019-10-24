import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// We can define this middleware just after the creation's and session's routes
// So this command just works for routes below it
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
