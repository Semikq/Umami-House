import { addDish, updateDish, deleteDish, addImageByDish, deleteImageByDish } from "../../models/dishes/dishesAdminModel";

export async function handleAddDish(req, res) {
  try {
    const result = await addDish(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function handleUpdateDish(req, res) {
  try{
    const result = await updateDish(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function handleDeleteDish(req, res) {
  try{
    const result = await deleteDish(req.params)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function handleAddImageByDish(req, res) {
  try{
      const result = await addImageByDish(req.body)
      res.json(result)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}

export async function  handleDeleteImageByDish(req, res) {
  try{
      const result = await deleteImageByDish(req.body)
      res.json(result)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}