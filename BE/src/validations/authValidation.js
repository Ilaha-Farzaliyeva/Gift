import Joi from "joi";

// Register
export const registerValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Login
export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Forgot Password
export const forgotPasswordValidationSchema = Joi.object({
    email: Joi.string().email().required(),
});

// Verify Reset Code
export const verifyResetCodeValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
});

// Reset Password
export const resetPasswordValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
    newPassword: Joi.string().min(6).required(),
});