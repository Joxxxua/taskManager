import express from "express";
import routes from './routes/index.js';
import conectarNaDatabase from "./config/dbConnect.js";
import cors from "cors"; // Adicione o CORS

const app = express();
const conexao = await conectarNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexao", erro);
});

conexao.once("open", () => {
    console.log("Conexão feita com sucesso");
});

app.use(cors()); // Habilita CORS para permitir requisições de origens diferentes
app.use(express.json());
routes(app); // As rotas estão sendo usadas aqui

export default app;