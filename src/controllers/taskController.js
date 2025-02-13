import Task from "../models/TaskModel.js";
import mongoose from "mongoose";

class TaskController {

    static async createTask(req, res) {
        try {
            const { title, description } = req.body;

            const newTask = await Task.create({
                title,
                description,
                user: req.user.id // Salva a task para o usuário autenticado
            });

            res.status(201).json({message: "Task criada com sucesso", task: newTask});
        }
        catch (erro) {
            res.status(500).json({message: erro.message});
        }
    }

    static async listTasks(req, res) {
        try { 
            const tasks = await Task.find();
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({message: error.message});
        }
    }
 
    static async getTaskById (req, res) {
        try {
            const {id} = req.params;
            const taskFound = await Task.findById(id);
            if (taskFound != null){
                res.status(200).json(taskFound);
            }else{
                res.status(404).json({message: "Task não encontrada"});
            }
        }
        catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async updateTask (req, res) {
        try{
            const {id} = req.params;
            const taskUpdated = await Task .findByIdAndUpdate(id);
            if (taskUpdated != null){
                res.status(200).json({message: "Task atualizada com sucesso"});
            }else{
                res.status(404).json({message: "Task não encontrada"});
            }
        }catch (error){
            res.status(500).json({message: error.message});
        }
    }

    static async deleteTask (req, res) {
        try{
            const {id} = req.params;
            const taskDeleted = await Task.findByIdAndDelete(id);
            if (taskDeleted != null){
                res.status(200).json({message: "Task deletada com sucesso"});
            }else{
                res.status(404).json({message: "Task não encontrada"});
            }
        }catch (error){
            res.status(500).json({message: error.message});
        }
    }
}
        

export default TaskController;