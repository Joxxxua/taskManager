import express from 'express';
import TaskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

routes.post('/tasks',authMiddleware, TaskController.createTask);
routes.get('/tasks', TaskController.listTasks);

export default routes;