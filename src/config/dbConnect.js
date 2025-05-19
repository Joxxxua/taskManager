import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', true); // Suppress the strictQuery warning

const mongoUri = process.env.MONGODB_URI;

async function conectarNaDatabase() {
    await mongoose.connect(mongoUri);
    return mongoose.connection;
}

export default conectarNaDatabase;