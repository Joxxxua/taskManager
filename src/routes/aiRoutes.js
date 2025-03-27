// routes/aiRoutes.js
import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import AiController from "../controllers/aiController.js";


const routes = express.Router();

// Rota para processamento de chat
routes.post('/chat', authMiddleware, AiController.processChat);
// Rota para análise de tarefa
routes.post('/analyze-task', authMiddleware, AiController.analyzeTask);


export default routes;