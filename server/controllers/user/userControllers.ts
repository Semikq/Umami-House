import { updateUser, deleteUser } from "../../models/user/userModel.js"
import { Request, Response } from "express"

export async function handleUpdateUser(req: Request , res: Response): Promise<void> {
    try {
        const result = await updateUser({ uuid: req.params.uuid }, req.body)
        res.status(200).json({ message: "User successfully updated", data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUser(req: Request , res: Response): Promise<void> {
    try {
        await deleteUser({ uuid: req.params.uuid })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}
