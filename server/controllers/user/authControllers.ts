import { registerUser, loginUser } from "../../models/user/authModel";
import { Request, Response } from "express";

export async function handleRegisterUser(req: Request , res: Response): Promise<void> {
    try {
        await registerUser(req.body)
        res.status(201).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleLoginUsers(req: Request , res: Response): Promise<void> {
    try {
        await loginUser(req.body)
        res.status(200).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}