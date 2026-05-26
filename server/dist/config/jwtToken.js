import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateAccessToken = (userUuid, role) => jwt.sign({ userUuid, role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
export const generateRefreshToken = (userUuid, role) => jwt.sign({ userUuid, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
