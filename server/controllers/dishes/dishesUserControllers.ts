import { fetchAllDishes, fetchDishById, fetchDishCommentsById, addCommentByIdDishes, deleteCommentByIdDishes } from "../../models/dishes/dishesUserModel";
import { Request, Response } from "express";

export async function handleGetAllDishes(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllDishes()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleGetDishById(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid dish id")
            return
        }

        const result = await fetchDishById({ id })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDishCommentsById(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid dish id")
            return
        }

        const result = await fetchDishCommentsById({ id })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddCommentByIdDishes(req: Request, res: Response): Promise<void> {
    try {
        await addCommentByIdDishes(req.body)
        res.status(201).json("Comment added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteCommentByIdDishes(req: Request, res: Response): Promise<void> {
    try {
        await deleteCommentByIdDishes(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}