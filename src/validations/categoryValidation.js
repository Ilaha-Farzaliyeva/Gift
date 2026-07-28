import Joi from "joi";

export const categoryValidationSchema = Joi.object({
    title: Joi.string().min(2).max(50).required()
});