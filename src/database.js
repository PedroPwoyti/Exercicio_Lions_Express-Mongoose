import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function conectarBanco() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Banco conectado com sucesso");
    } catch (error) {
        console.log("Erro ao conectar ao banco:", error);
    }
}

export default conectarBanco;