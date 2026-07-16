import { Router } from "express";
import { createCategory, deleteByIdCategory, getAllCategories, getByIdCategory, updateByIdCategory } from "../controllers/categoryController.js";
import { getByIdProducts } from "../controllers/productController.js";
export const categoryRouter = Router()

categoryRouter.get('/', getAllCategories)
    .get('/:id', getByIdCategory)
    .post('/', createCategory)
    .put('/:id', updateByIdCategory)
    .delete('/:id', deleteByIdCategory)