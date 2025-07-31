import express from "express"
import cors from "cors"
import dishesRouter from "./routes/dishesRoutes.js"
import favoritesRoutes from "./routes/favoritesRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import partnersRoutes from "./routes/partnersRoutes";
import restaurantsRoutes from "./routes/restaurantsRoutes";
import saleRoutes from "./routes/saleRoutes";
import userRoutes from "./routes/userRoutes";
const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use("/dishes", dishesRouter)
app.use("/favorites", favoritesRoutes)
app.use("/orders", ordersRoutes)
app.use("/partners", partnersRoutes)
app.use("/restaurants", restaurantsRoutes)
app.use("/sales", saleRoutes)
app.use("/users", userRoutes)

app.listen(3002, () => {
    console.log("Server is running on port 3002")
})