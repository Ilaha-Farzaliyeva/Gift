import { Router } from "express";
import { createCategory, deleteByIdCategory, getAllCategories, getByIdCategory, updateByIdCategory } from "../controllers/categoryController.js";
import { getByIdProducts } from "../controllers/productController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { verifyToken, validate } from "../middleware/authMiddleware.js";
import { categoryValidationSchema } from "../validations/categoryValidation.js";
export const categoryRouter = Router()

categoryRouter.get('/', getAllCategories)
    .get('/:id', getByIdCategory)
    .post('/', verifyToken, isAdmin, validate(categoryValidationSchema), createCategory)
    .put('/:id', verifyToken, isAdmin, validate(categoryValidationSchema), updateByIdCategory)
    .delete('/:id', verifyToken, isAdmin, deleteByIdCategory)