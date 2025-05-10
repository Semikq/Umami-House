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

export async function handleChoiceRoleUserById(req: Request , res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid user id")
            return
        }

        await choiceRoleUser({ id }, req.body)
        res.status(200).json("Choice user successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUserById(req: Request , res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid user id")
            return
        }
        
        await deleteUser({ id })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}