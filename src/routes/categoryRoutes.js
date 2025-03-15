import express from "express"
import CategoryController from "../controllers/categoriesController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.post("/categories", authMiddleware ,CategoryController.createCategory);

export default routes;