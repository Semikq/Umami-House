import { fetchCategoryWithDishes, fetchAllCategories, fetchAllDishes, fetchDishByUuid, fetchDishCommentsByUuid, addCommentByUuidDishes, deleteCommentByUuidDishes } from "../../models/dishes/dishesUserModel.js";
import { Request, Response } from "express";

export async function handleCategoryWithDishes(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchCategoryWithDishes({ uuid: req.params.uuid })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAllCategories(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllCategories()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleGetAllDishes(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllDishes()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleGetDishByUuid(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchDishByUuid({ uuid: req.params.uuid })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDishCommentsByUuid(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchDishCommentsByUuid({ uuid: req.params.uuid })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddCommentByUuidDishes(req: Request, res: Response): Promise<void> {
    try {
        const result = await addCommentByUuidDishes(req.body)
        res.status(201).json({ data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteCommentByUuidDishes(req: Request, res: Response): Promise<void> {
    try {
        await deleteCommentByUuidDishes(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}
