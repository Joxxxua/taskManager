
import Category from "../models/CategoryModel.js";
import categorySchema from "../service/validation/categoryValidation.js";


class CategoryController {

    static async createCategory(req,res){
        try{
            const {error, value} = categorySchema.validate(req.body, {abortEarly: false})

            if(error){
                return res.status(400).json({
                    message: "Erro na validação dos dados",
                    errors: error.details.map(err => err.message)
                });
        
            }

            const {name} = value;
            const existingCategory = await Category.findOne({
                name,
                userId: req.user.id
            });


            if(existingCategory){
                return res.status(400).json({message: "Categoria já cadastrada"})
            }

            const newCategory = await Category.create({
                name: name.trim(),
                userId: req.user.id
            })

            await newCategory.save();

            res.status(201).json({
                message: "Categoria criada com sucesso",
                category: newCategory
            })
        }catch(error){
            res.status(500).json({ message: `Erro ao criar categoria: ${error.message}` });
        }
    }

}

export default CategoryController;