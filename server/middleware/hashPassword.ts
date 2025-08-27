import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"

export async function hashPassword(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashedPassword
        next()
    } catch (error) {
        res.status(500).json({ message: "Error while hashing password" })
    }
}