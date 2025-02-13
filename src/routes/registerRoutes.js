import express from 'express';
import RegisterController from '../controllers/registerController.js';

const routes = express.Router();

routes.post('/register', RegisterController.createUser);
routes.get('/register', RegisterController.listUsers);
routes.get('/register/:id', RegisterController.getUserById);

export default routes;