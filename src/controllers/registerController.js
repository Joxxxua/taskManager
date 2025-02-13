import User from '../models/UserModel.js';
import registerSchema from '../service/validation/registerValidation.js'
import bcrypt from 'bcrypt';

class RegisterController {

    static async createUser(req, res) {
        try {

            const {error , value} = registerSchema.validate(req.body, {abortEarly: false})
            if (error) {
             
                return res.status(400).json({ 
                    message: "Erro na validação dos dados.",
                    errors: error.details.map(err => err.message)
                });
            }
            const {name , email, password} = value;
            const existingUser = await User.findOne({email})
            
            if (existingUser){
                return res.status(400).json({message: "Email já cadastrado"})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

             const newUser = await User.create({name, email, password: hashedPassword});
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

    static async getUserById(req, res) {
        try {
            const {id} = req.params;
            const userFound = await User.findById(id);
            if (userFound != null){
                res.status(200).json(userFound);
            } else {
                res.status(404).json({message: "Usuário não encontrado"});
            }
        } catch (erro) {
            res.status(500).json({message: erro.message});
        }
    }
}

export default RegisterController;