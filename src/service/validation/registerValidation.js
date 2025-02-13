import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'O campo nome é obrigatório.',
      'string.min': 'O campo nome deve ter pelo menos 3 caracteres.',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'O campo e-mail é obrigatório.',
        'string.email': 'O campo e-mail deve ser um e-mail válido.',
      }),
    password: Joi.string().min(6).regex(/^[A-Z]/).required().messages({
        'string.empty': 'O campo senha é obrigatório.',
        'string.min': 'O campo senha deve ter pelo menos 6 caracteres.',
        'string.pattern.base': 'O campo senha deve começar com uma letra maiúscula.',
      }),
});

export default registerSchema;