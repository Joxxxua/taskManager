import express from "express"
import routes from './routes/index.js';
import conectarNaDatabase from "./config/dbConnect.js";

const conexao = await conectarNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexao", erro);
    
});

conexao.once("open", () => {
    console.log("Conexão feita com sucesso");
    
})

const app = express()
routes(app);

export default app;