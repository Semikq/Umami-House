import { updateUser, deleteUser } from "../../models/user/userModel"
import { Request, Response } from "express"

export async function handleUpdateUser(req: Request , res: Response): Promise<void> {
    try {
        const result = await updateUser(req.body)
        res.status(200).json({ message: "User successfully updated", user: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUser(req: Request , res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json({ message: "Invalid user id" })
            return
        }

        const user = await deleteUser({ id })

        if(user.affectedRows === 0){
            res.status(404).json({ message: "User not found" })
            return
        }
        
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}