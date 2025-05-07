import { pool } from "../../pool.js"
import { AllDishes, DishComments, DishAndCommentsById, AddCommentByIdDishes, DeleteCommentByIdDishes } from "../TypesModel/dishesTypes.js"

export async function fetchAllDishes(): Promise<AllDishes[]> {
  try {
    const [allDishes] = await pool.execute<AllDishes[]>(`
      SELECT d.*,
        JSON_ARRAYAGG(
          JSON_OBJECT('title', di.title, 'image_url', di.image_url)
        ) AS images
      FROM dishes d
      LEFT JOIN dish_image di ON d.id = di.dish_id
      GROUP BY d.id
    `)
    return allDishes
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchDishById({ id }: DishAndCommentsById): Promise<AllDishes> {
  try {
    const [dishById] = await pool.execute<AllDishes[]>(`
      SELECT d.*,
        JSON_ARRAYAGG(
          JSON_OBJECT('title', di.title, 'image_url', di.image_url)
        ) AS images
      FROM dishes d
      LEFT JOIN dish_image di ON d.id = di.dish_id
      WHERE d.id = ?
      GROUP BY d.id
    `, [id])
    return dishById[0]
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchDishCommentsById({ id }: DishAndCommentsById):Promise<DishComments[]> {
  try {
    const [rows] = await pool.execute<DishComments[]>("SELECT dc.comment, dc.rating, dc.created_at, u.name AS name FROM dish_comments dc JOIN users u ON dc.user_id = u.id WHERE dc.dish_id = ?", [id])
    return rows
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function addCommentByIdDishes({ dish_id, user_id, comment, rating }: AddCommentByIdDishes):Promise<void> {
  try {
    await pool.execute("INSERT INTO dish_comments (dish_id, user_id, comment, rating) VALUES (?, ?, ?, ?)", [dish_id, user_id, comment, rating])
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function deleteCommentByIdDishes({ user_id, id }: DeleteCommentByIdDishes):Promise<void> {
  try {
    await pool.execute("DELETE FROM dish_comments WHERE user_id = ? AND id = ?", [user_id, id])
  } catch (error) {
    throw new Error((error as Error).message)
  }
}