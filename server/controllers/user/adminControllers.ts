import { Request, Response } from "express";
import { fetchAllUsers, choiceRoleUser, deleteUser } from "../../models/user/adminModel";

export async function handleAllUsers(req: Request , res: Response):Promise<void> {
    try {
        const result = await fetchAllUsers(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleChoiceUser(req: Request , res: Response):Promise<void> {
    try {
        const result = await choiceRoleUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUser(req: Request , res: Response):Promise<void> {
    try {
        const result = await deleteUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}