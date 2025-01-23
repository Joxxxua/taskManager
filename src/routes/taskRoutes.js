import express from 'express';
import TaskController from '../controllers/taskController.js';

const routes = express.Router();

routes.post('/tasks', TaskController.createTask);
routes.get('/tasks', TaskController.listTasks);

export default routes;