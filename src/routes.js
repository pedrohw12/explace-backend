import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CityController from './app/controllers/CityController';
import TuristicPointController from './app/controllers/TuristicPointController';
import NeighborController from './app/controllers/NeighborController';
import TradeController from './app/controllers/TradeController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/cities', CityController.store);
routes.post('/turisticpoints', TuristicPointController.store);
routes.post('/neighbor', NeighborController.store);
routes.post('/trade', TradeController.store);

// routes.use(authMiddleware);

routes.put('/users', UserController.update);



export default routes;