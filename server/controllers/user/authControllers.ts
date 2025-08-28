import { registerUser, loginUser } from "../../models/user/authModel";
import { Request, Response } from "express";
import { generateToken } from "../../config/jwtToken";

export async function handleRegisterUser(req: Request , res: Response): Promise<void> {
    try {
        const result = await registerUser(req.body)
        const { password, ...user } = result
        res.status(200).json(generateToken({ user }))
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleLoginUsers(req: Request , res: Response): Promise<void> {
    try {
        const result = await loginUser(req.body)
        const { password, ...user } = result
        res.status(200).json(generateToken({ user }))
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}