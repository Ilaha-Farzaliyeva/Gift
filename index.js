import express from "express"
import  "./src/config/config.js"
import cors from "cors"
import "dotenv/config"
import { productRouter } from "./src/routers/productRouter.js"
import { userRouter } from "./src/routers/userRouter.js"
import { categoryRouter } from "./src/routers/categoryRouter.js"

const app = express()
const port = 5000


app.use(express.json())
app.use(cors())

app.use("/products",productRouter)
app.use("/user",userRouter)
app.use("/category",categoryRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})