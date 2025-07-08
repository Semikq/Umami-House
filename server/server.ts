import express from "express"
import cors from "cors"
import dishesRouter from "./routes/dishesRoutes.js"
import {pool} from "./config/dbConfig";
import {Prisma, PrismaClient} from "@prisma/client";
const app = express()

const prisma = new PrismaClient()
app.use(express.json())
app.use(cors())
app.use("/dishes", dishesRouter)

console.log("DASD")

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})