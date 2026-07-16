import { Router } from "express";
import { createUser, deleteByIdUser, getAllUser, getByIdUser, updateByIdUser } from "../controllers/userController.js"

export const userRouter = Router()
userRouter.get('/',getAllUser)
.get('/:id',getByIdUser)
.post('/',createUser)
.put('/:id',updateByIdUser)
.delete('/:id',deleteByIdUser)