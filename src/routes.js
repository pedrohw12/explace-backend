import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CityController from './app/controllers/CityController';
import FindCityController from './app/controllers/FindCityController';
import CommentCityController from './app/controllers/CommentCityController';
import TuristicPointController from './app/controllers/TuristicPointController';
import NeighborController from './app/controllers/NeighborController';
import TradeController from './app/controllers/TradeController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);

routes.put('/users', UserController.update);
// routes.put('/cities/:city_id',  upload.single('file'), CityController.update);

// routes.get('/cities/:city_id/edit', CityController.edit);
routes.get('/cities', CityController.index);
routes.get('/city', FindCityController.index);
routes.get('/neighbors', NeighborController.index);
routes.get('/trades', TradeController.index);
routes.get('/turisticpoints', TuristicPointController.index);
routes.get('/comments', CommentCityController.index);
routes.get('/city/:city_id/file', FileController.index);

routes.post('/cities', CityController.store);
routes.post('/city/:city_id/comments', CommentCityController.store);
routes.post('/turisticpoints', TuristicPointController.store);
routes.post('/neighbors', NeighborController.store);
routes.post('/trades', TradeController.store);

routes.post('/files/:city_id', upload.single('file'), FileController.store);
// este 'file' dentro de upload.single() refere ao nome que será colocado na requisição
// pelo insomnia, ou seja, no insomnia, ao selecionar multi form, o nome será o mesmo que está
// sendo dito na rota dentro do upload.single()


export default routes;