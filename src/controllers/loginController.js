import dotenv from "dotenv"
import User from "../models/UserModel.js"
import loginSchema from "../service/validation/loginValidation.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";

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
          
            res.cookie("token", token, {
                httpOnly: true, // Protege contra XSS
                secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
                sameSite: "Strict", // Protege contra CSRF
                maxAge: 7 * 24 * 60 * 60 * 1000, // Expira em 7 dias
            });
            
            res.status(200).json({ message: "Login bem-sucedido!"  });

        }catch(error){
            res.status(500).json({ message: `Erro ao fazer login: ${error.message}` });
        }
    }

    static async forgotPassword(req, res){
        try{
            const {email} = req.body

            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const resetToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "15m" });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions    = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Recuperação de senha",
                html:`<p>Clique no link para redefinir sua senha:</p>
                       <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Redefinir Senha</a>
                       <p>O link expira em 15 minutos.</p>`,
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "E-mail de recuperação enviado." });
        }catch (error) {
            res.status(500).json({ message: `Erro ao enviar e-mail: ${error.message}` });
        }
    
    }

    static async resetPassword(req, res){
        try{
            const {token, newPassword} = req.body;

            const decoded = jwt.verify(token, process.env.SECRET);
            
            
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

            await user.save();

            res.status(200).json({ message: "Senha redefinida com sucesso!" });

        }catch (error) {
            res.status(400).json({ message: "Token inválido ou expirado." });
        }
    }
    

}


export default LoginController;