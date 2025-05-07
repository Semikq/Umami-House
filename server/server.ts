import express from "express"
import cors from "cors"
// import dishesRouter from "./routes/dishesRoutes.js"
const app = express()

console.log("DAS")
app.use(express.json())
app.use(cors())
// app.use("/", dishesRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
