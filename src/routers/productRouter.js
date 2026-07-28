import { Router } from "express"
import { getAllProducts, getByIdProducts, createProducts, updateByIdProducts, deleteByIdProducts } from "../controllers/productController.js"
import { isAdmin } from "../middleware/isAdmin.js";
import { verifyToken } from "../middleware/authMiddleware.js";

export const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.get("/:id", getByIdProducts)
productRouter.post("/", verifyToken,isAdmin, createProducts)
productRouter.put("/:id", verifyToken,isAdmin, updateByIdProducts)
productRouter.delete("/:id", verifyToken,isAdmin, deleteByIdProducts)