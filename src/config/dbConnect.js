import mongoose from 'mongoose';

mongoose.set('strictQuery', true); // Suppress the strictQuery warning

async function conectarNaDatabase() {
    await mongoose.connect("mongodb+srv://joaopedrosouzarodri:vIyRJl26zsGKRu38@cluster0.rlkzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    return mongoose.connection;
}

export default conectarNaDatabase;