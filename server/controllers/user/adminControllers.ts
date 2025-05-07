import { fetchAllUsers, choiceRoleUser, deleteUser } from "../../models/user/adminModel";
import { Request, Response } from "express";

export async function handleAllUsers(req: Request , res: Response): Promise<void> {
    try {
        const result = await fetchAllUsers()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleChoiceUser(req: Request , res: Response): Promise<void> {
    try {
        await choiceRoleUser(req.body)
        res.status(200).json("Choice user successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUser(req: Request , res: Response): Promise<void> {
    try {
        await deleteUser(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}