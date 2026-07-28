import Joi from "joi";

export const productValidationSchema = Joi.object({
    image: Joi.string().uri().required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(500).required(),
    contact: Joi.object({
        phone: Joi.string().optional(),
        instagram: Joi.string().optional()
    }).optional(),
    price: Joi.number().min(1).max(10000).required(),
    categoryId: Joi.string().required()
});