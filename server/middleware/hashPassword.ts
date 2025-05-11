import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"

export async function hashPassword(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        req.body.password = hashedPassword
        next()
    } catch (error) {
        res.status(500).json({ message: "Error while hashing password" })
    }
}