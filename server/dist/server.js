import express from "express";
import cors from "cors";
import dishesRouter from "./routes/dishesRoutes.js";
import favoritesRouter from "./routes/favoritesRoutes.js";
import ordersRouter from "./routes/ordersRoutes.js";
import partnersRouter from "./routes/partnersRoutes.js";
import restaurantsRouter from "./routes/restaurantsRoutes.js";
import saleRouter from "./routes/saleRoutes.js";
import userRouter from "./routes/userRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
app.use(express.json());
app.use(cors());
app.use("/dishes", dishesRouter);
app.use("/favorites", favoritesRouter);
app.use("/orders", ordersRouter);
app.use("/partners", partnersRouter);
app.use("/restaurant", restaurantsRouter);
app.use("/sale", saleRouter);
app.use("/user", userRouter);
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, '../../client/build');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
});
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
//# sourceMappingURL=server.js.map