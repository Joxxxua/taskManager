import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: { type: String, enum: ['pendente', 'em andamento', 'concluído'], default: 'pendente' },
    dueDate: Date,
    id: {type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},

})

const Task = mongoose.model('Task', taskSchema);

export default Task;