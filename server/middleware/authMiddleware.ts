import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader  = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
        res.status(401).send("No token provided");
        return;
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: number, role: string };
        (req as any).user = decoded
        next()
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user

    if (user.role !== "admin") {
        res.status(403).json({ error: "Forbidden: Admin access required" });
        return;
    }
    next();
}

export async function handleLogout(req: Request, res: Response) {
    res.clearCookie("refreshToken")
    res.json({ message: "Logged out" })
}