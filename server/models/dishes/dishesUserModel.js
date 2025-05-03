import { pool } from "../../pool.js"

export async function fetchAllDishes() {
  try {
    const [rows] = await pool.execute("SELECT * FROM dishes")
    return rows
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchDishById({ id }) {
  try {
    const [rows] = await pool.execute("SELECT d.*, GROUP_CONCAT(CONCAT(di.title, ': ', di.image_url) SEPARATOR ', ') AS images FROM dishes d LEFT JOIN dish_image di ON d.id = di.dish_id WHERE d.id = ? GROUP BY d.id", [id])
    return rows
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchDishCommentsById({ id }) {
  try {
    const [rows] = await pool.execute("SELECT dc.comment, dc.rating, u.name FROM dish_comments dc JOIN users u ON dc.user_id = u.id WHERE dc.dish_id = ?", [id])
    return rows
  } catch (error) {
    throw new Error(error.message)
  }
}