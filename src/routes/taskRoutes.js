import express from 'express';
import TaskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

routes.post('/tasks',authMiddleware, TaskController.createTask);
routes.get('/tasks', authMiddleware ,TaskController.listTasks);
routes.delete("/tasks/:id", authMiddleware, TaskController.deleteTask);

export default routes;