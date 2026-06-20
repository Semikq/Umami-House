import {
    addDish,
    updateDish,
    deleteDish,
    deleteCommentUserByUuid,
    uploadDishImage,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    updateCategory,
} from "../../models/dishes/dishesAdminModel.js";
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

export async function handleUploadDishImage(req: Request, res: Response): Promise<void> {
  try {
    const result = await uploadDishImage(req.body);
    res.status(201).json({ message: "Image uploaded", data: result });
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}

export async function handleAddSubCategory(req: Request, res: Response): Promise<void> {
  try {
    const result = await addSubCategory(req.body);
    res.status(201).json({ message: "Subcategory created", data: result });
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}

export async function handleUpdateSubCategory(req: Request, res: Response): Promise<void> {
  try {
    const result = await updateSubCategory({ uuid: req.params.uuid }, req.body);
    res.status(200).json({ message: "Subcategory updated", data: result });
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}

export async function handleDeleteSubCategory(req: Request, res: Response): Promise<void> {
  try {
    await deleteSubCategory({ uuid: req.params.uuid });
    res.status(204).send();
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}

export async function handleDeleteCommentUserByUuid(req: Request, res: Response): Promise<void> {
  try {
    await deleteCommentUserByUuid({ uuid: req.params.uuid })
    res.status(204).send()
  } catch (error) {
    res.status(500).json((error as Error).message)
  }
}

export async function handleUpdateCategory(req: Request, res: Response): Promise<void> {
  try {
    const result = await updateCategory({ uuid: req.params.uuid }, req.body);
    res.status(200).json({ message: "Category updated", data: result });
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}
