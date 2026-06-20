import dotenv from "dotenv";
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
import { isSupabaseStorageEnabled } from "./services/storageUpload.js";
dotenv.config();
const app = express();

const corsOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "https://umami-house-client.vercel.app",
    ...(process.env.CLIENT_URL
        ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
        : []),
];

// 1. CORS МАЄ СТОЯТИ НАЙПЕРШИМ
app.use(cors({
    origin: corsOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}));

// 2. Усі інші мідлвари йдуть СТРОГО ПІСЛЯ CORS
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

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
    console.log(`Storage: ${isSupabaseStorageEnabled() ? "Supabase (menu bucket)" : "local uploads/ folder"}`);
});