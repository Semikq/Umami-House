import { addDish, updateDish, deleteDish, deleteCommentUserById } from "../../models/dishes/dishesAdminModel";
import { Request, Response } from "express";

export async function handleAddDish(req: Request, res: Response): Promise<void> {
  try {
    await addDish(req.body)
    res.status(201).json("Dish successfully added")
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleUpdateDish(req: Request, res: Response): Promise<void> {
  try{
    await updateDish(req.body)
    res.status(200).json("Dish successfully update")
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleDeleteDish(req: Request, res: Response): Promise<void> {
  try{
    const id = Number(req.params.id)
    
    if (isNaN(id)){
      res.status(400).json("Invalid dish id")
      return
    }

    await deleteDish({ id })
    res.status(204).send()
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleDeleteCommentUserById(req: Request, res: Response): Promise<void> {
  try {
    await deleteCommentUserById(req.body)
    res.status(204).send()
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}