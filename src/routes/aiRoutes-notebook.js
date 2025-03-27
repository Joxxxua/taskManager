// routes/aiRoutes.js
import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import AiController from "../controllers/aiController.js";


const routes = express.Router();

// Rota para processamento de chat
routes.post('/chat', authMiddleware, AiController.processChat);

// Rota para análise de tarefa
routes.post('/analyze-task', authMiddleware, AiController.analyzeTask);

// Rota para sugestão de próximas tarefas
routes.post('/suggest-tasks', authMiddleware, AiController.suggestNextTasks);

// Rota para sugestões de melhoria de tarefas
routes.post('/improve-task', authMiddleware, AiController.improveTasks);

export default routes;