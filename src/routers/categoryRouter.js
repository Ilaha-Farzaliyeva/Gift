import { Router } from "express";
import { createCategory, deleteByIdCategory, getAllCategories, getByIdCategory, updateByIdCategory } from "../controllers/categoryController.js";
import { getByIdProducts } from "../controllers/productController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { verifyToken } from "../middleware/authMiddleware.js";
export const categoryRouter = Router()

categoryRouter.get('/', getAllCategories)
    .get('/:id', getByIdCategory)
    .post('/',  verifyToken,isAdmin, createCategory)
    .put('/:id', verifyToken,isAdmin, updateByIdCategory)
    .delete('/:id', verifyToken,isAdmin, deleteByIdCategory)