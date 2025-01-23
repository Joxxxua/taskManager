import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

class RegisterController {

    static async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json({message: "Usuário criado com sucesso", user: newUser});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar autor`});
        }
    }

    static async listUsers(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query; // Parâmetros de consulta para paginação
            const users = await User.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const count = await User.countDocuments();

            res.status(200).json({
                users,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (erro) {
            res.status(500).json({message: erro.message});
        }
    }
}

export default RegisterController;