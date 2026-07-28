import { Router } from "express"
import { getAllProducts, getByIdProducts, createProducts, updateByIdProducts, deleteByIdProducts } from "../controllers/productController.js"
import { isAdmin } from "../middleware/isAdmin.js";
import { verifyToken, validate } from "../middleware/authMiddleware.js";
import { productValidationSchema } from "../validations/productValidation.js";

export const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.get("/:id", getByIdProducts)
productRouter.post("/", verifyToken, isAdmin, validate(productValidationSchema), createProducts)
productRouter.put("/:id", verifyToken, isAdmin, validate(productValidationSchema), updateByIdProducts)
productRouter.delete("/:id", verifyToken, isAdmin, deleteByIdProducts)