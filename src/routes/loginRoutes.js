import express from "express";
import LoginController from "../controllers/loginController.js";

const routes = express.Router();

routes.post("/login", LoginController.loginUser); // POST para login
routes.post("/forgot-password",LoginController.forgotPassword);
routes.post("/reset-password", LoginController.resetPassword);

export default routes;
