import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const generateAccessToken = (userId: number, role: string) =>
    jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });

export const generateRefreshToken = (userId: number, role: string) =>
    jwt.sign({ userId, role }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });