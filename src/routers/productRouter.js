import { Router } from "express"
import { getAllProducts, getByIdProducts, createProducts, updateByIdProducts, deleteByIdProducts } from "../controllers/productController.js"

export const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.get("/:id", getByIdProducts)
productRouter.post("/", createProducts)
productRouter.put("/:id", updateByIdProducts)
productRouter.delete("/:id", deleteByIdProducts)