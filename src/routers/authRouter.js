import { Router } from "express";
import { loginController, registerController, forgotPasswordController, verifyResetCodeController, resetPasswordController, } from "../controllers/authController.js";
import { validate } from "../middleware/authMiddleware.js";
import {
    registerValidationSchema,
    loginValidationSchema,
    forgotPasswordValidationSchema,
    verifyResetCodeValidationSchema,
    resetPasswordValidationSchema,
} from "../validations/authValidation.js";
export const authRouter = Router();

authRouter.post("/register", validate(registerValidationSchema), registerController);
authRouter.post("/login", validate(loginValidationSchema), loginController);
authRouter.post("/forgot-password", validate(forgotPasswordValidationSchema), forgotPasswordController);
authRouter.post("/verify-reset-code", validate(verifyResetCodeValidationSchema), verifyResetCodeController);
authRouter.post("/reset-password", validate(resetPasswordValidationSchema), resetPasswordController);
