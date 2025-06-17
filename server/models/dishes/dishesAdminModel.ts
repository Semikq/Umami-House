import { pool } from "../../config/dbConfig"
import { AddDish, UpdateDish, DishId, DeleteCommentUserById } from "../TypesModel/dishesTypes"
import { ResultSetHeader } from "mysql2"

export async function addDish({
  name, weight, price, frozen, spicy,
  ingredients, subcategories_id, active, images,
}: AddDish): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertDishQuery = `
      INSERT INTO umamihouse.dishes (name, weight, price, frozen, spicy, ingredients, subcategories_id, active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;
    const res = await client.query(insertDishQuery, [name, weight, price, frozen, spicy, ingredients, subcategories_id, active]);
    const dishId = res.rows[0].id;

    for (const image of images) {
      const { title, image_url } = image;
      await client.query(
        `INSERT INTO umamihouse.dish_image (title, image_url, dish_id) VALUES ($1, $2, $3)`,
        [title, image_url, dishId]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error((error as Error).message);
  } finally {
    client.release();
  }
}

export async function updateDish(
  { id }: DishId,
  {
    name, weight, price, frozen, spicy,
    ingredients, subcategories_id, active, images,
  }: UpdateDish
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `UPDATE umamihouse.dishes
       SET name = $1, weight = $2, price = $3, frozen = $4, spicy = $5,
           ingredients = $6, subcategories_id = $7, active = $8
       WHERE id = $9`,
      [name, weight, price, frozen, spicy, ingredients, subcategories_id, active, id]
    );

    for (const image of images) {
      const { title, image_url } = image;
      await client.query(
        `INSERT INTO umamihouse.dish_image (title, image_url, dish_id) VALUES ($1, $2, $3)`,
        [title, image_url, id]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error((error as Error).message);
  } finally {
    client.release();
  }
}

export async function deleteDish({ id }: DishId): Promise<void> {
  try {
    await pool.query("DELETE FROM umamihouse.dishes WHERE id = $1", [id]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCommentUserById({ id }: DeleteCommentUserById): Promise<void> {
  try {
    await pool.query("DELETE FROM umamihouse.dish_comments WHERE id = $1", [id]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
