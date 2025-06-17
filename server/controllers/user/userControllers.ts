import { updateUser, deleteUser } from "../../models/user/userModel.js"
import { Request, Response } from "express"

export async function handleUpdateUser(req: Request , res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        const result = await updateUser({ id }, req.body)
        res.status(200).json({ message: "User successfully updated", user: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteUser(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const result = await deleteUser({ id });

    if (result.rowCount === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(204).send(); // Успішне видалення, без контенту
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
