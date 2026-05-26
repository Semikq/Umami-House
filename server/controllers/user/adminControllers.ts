import { fetchAllUsers, choiceRoleUser, deleteUser } from "../../models/user/adminModel.js";
import { Request, Response } from "express";

export async function handleAllUsers(req: Request , res: Response): Promise<void> {
    try {
        const result = await fetchAllUsers()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleChoiceRoleUserByUuid(req: Request , res: Response): Promise<void> {
    try {
        const result = await choiceRoleUser({ uuid: req.params.uuid, role: req.body.role })
        res.status(200).json({ message: "Choice user successfully added", data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUserByUuid(req: Request , res: Response): Promise<void> {
    try {
        await deleteUser({ uuid: req.params.uuid })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}
