import express from "express";
import tasks from "./taskRoutes.js";
import register from "./registerRoutes.js";
import login from "./loginRoutes.js";



const routes = (app) => {
app.route('/').get((req,res) => res.status(200).send("Raiz"))

app.use(express.json(), tasks, register, login, );

};

export default routes;