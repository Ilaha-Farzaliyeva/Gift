import { Router } from "express";
import { createUser, deleteByIdUser, getAllUser, getByIdUser, updateByIdUser } from "../controllers/userController.js"
import { userValidationSchema } from "../validations/userValidation.js";
import { validate } from "../middleware/authMiddleware.js";

export const userRouter = Router()
userRouter.get('/', getAllUser)
    .get('/:id', getByIdUser)
    .post('/', validate(userValidationSchema), createUser)
    .put('/:id', validate(userValidationSchema), updateByIdUser)
    .delete('/:id', deleteByIdUser)