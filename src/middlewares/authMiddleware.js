import dotenv from "dotenv"
import jwt from 'jsonwebtoken';

dotenv.config();

const authMiddleware = (req, res, next) => {
    
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
       
        const decoded = jwt.verify(token.replace("Bearer ", ""),process.env.SECRET);
        req.user = decoded; // Adiciona o usuário na requisição
        next();
    } catch (error) {
        res.status(400).json({ message: "Token inválido." });
    }
};

export default authMiddleware;