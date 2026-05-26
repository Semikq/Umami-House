import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const generateAccessToken = (userUuid: string, role: string) =>
    jwt.sign({ userUuid, role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });

export const generateRefreshToken = (userUuid: string, role: string) =>
    jwt.sign({ userUuid, role }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
