import { fetchAllDishes, fetchDishById } from "../models/dishesModel";

export async function handleGetAllDishes(res) {
    try {
      const result = await fetchAllDishes();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

export async function handleGetDishById(req, res) {
    const { id } = req.body
    try{
        const result = await fetchDishById(id)
        res.json(result)
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}