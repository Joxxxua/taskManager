import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'O campo nome é obrigatório',
        'string.min': 'O campo não pode estar em branco'
    })
})

export default categorySchema;