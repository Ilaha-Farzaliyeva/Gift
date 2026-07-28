import { Router } from "express";
import { loginController, registerController,forgotPasswordController,verifyResetCodeController,resetPasswordController, } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/verify-reset-code", verifyResetCodeController);
authRouter.post("/reset-password", resetPasswordController);
