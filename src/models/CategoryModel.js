import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId}
},{ timestamps: true });

const Category = mongoose.model('Categorie', categorySchema)

export default Category;