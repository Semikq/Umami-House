import { updateUser, deleteUser } from "../../models/user/userModel"
import { Request, Response } from "express"

export async function handleUpdateUser(req: Request , res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)
        const result = await updateUser({ id }, req.body)
        res.status(200).json({ message: "User successfully updated", data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUser(req: Request , res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)
        await deleteUser({ id })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}