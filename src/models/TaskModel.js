import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pendente', 'em andamento', 'concluído'], default: 'pendente' },
    dueDate: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Corrigido!
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: "Category" }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
