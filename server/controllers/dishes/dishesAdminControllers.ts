import { addDish, updateDish, deleteDish, deleteCommentUserByUuid } from "../../models/dishes/dishesAdminModel.js";
import { Request, Response } from "express";

export async function handleAddDish(req: Request, res: Response): Promise<void> {
  try {
    const result = await addDish(req.body)
    res.status(201).json({ message: "Dish successfully added", data: result })
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleUpdateDish(req: Request, res: Response): Promise<void> {
  try{
    const result = await updateDish({ uuid: req.params.uuid }, req.body)
    res.status(200).json({ message: "Dish successfully update", data: result })
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleDeleteDish(req: Request, res: Response): Promise<void> {
  try{
    await deleteDish({ uuid: req.params.uuid })
    res.status(204).send()
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleDeleteCommentUserByUuid(req: Request, res: Response): Promise<void> {
  try {
    await deleteCommentUserByUuid(req.body)
    res.status(204).send()
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}
