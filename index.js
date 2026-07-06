import express from "express"
import  "./src/config/config.js"
import cors from "cors"
import "dotenv/config"
import { productRouter } from "./src/routers/productRouter.js"

const app = express()
const port = 5000


app.use(express.json())
app.use(cors())

app.use("/products",productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})