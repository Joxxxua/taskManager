import dotenv from "dotenv"
import User from "../models/UserModel.js"
import loginSchema from "../service/validation/loginValidation.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config();

class LoginController {
    static async loginUser(req, res)  {
        try {
            const {error, value} = loginSchema.validate(req.body, {abortEarly: false})

            if(error) {
                return res.status(400).json({ 
                    message: "Erro na validação dos dados.",
                    errors: error.details.map(err => err.message)
                });
            }

            const {email, password} = value;
            const user = await User.findOne({email});

            if (!user) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }
            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }
            
            const token = jwt.sign(
                { id: user._id, email: user.email }, 
                process.env.SECRET, // Troque por uma variável de ambiente
                { expiresIn: "1h" } // Token válido por 1 hora
            );
            
            res.status(200).json({ message: "Login bem-sucedido!" ,
                token 
            });

        }catch(error){
            res.status(500).json({ message: `Erro ao fazer login: ${error.message}` });
        }
    

}
}
export default LoginController;