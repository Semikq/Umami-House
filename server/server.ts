import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dishesRouter from "./routes/dishesRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import partnersRoutes from "./routes/partnersRoutes.js";
import restaurantsRoutes from "./routes/restaurantsRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://umami-house-client.onrender.com",
    credentials: true,
}));

app.use("/uploads", express.static("uploads"));
app.use("/dishes", dishesRouter);
app.use("/favorites", favoritesRoutes);
app.use("/orders", ordersRoutes);
app.use("/partners", partnersRoutes);
app.use("/restaurants", restaurantsRoutes);
app.use("/sales", saleRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`${PORT}`);
});