import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.empty': 'O campo e-mail é obrigatório.',
            'string.email': 'O campo e-mail deve ser um e-mail válido.',
          }),
        password: Joi.string().min(6).regex(/^[A-Z]/).required().messages({
            'string.empty': 'O campo senha é obrigatório.',
            
          }),
})

export default loginSchema;