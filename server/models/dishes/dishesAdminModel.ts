import { pool } from "../../config/dbConfig"
import { AddDish, UpdateDish, DishId, DeleteCommentUserById } from "../TypesModel/dishesTypes"
import { ResultSetHeader } from "mysql2"

export async function addDish({ name, weight, price, frozen, spicy, ingredients, subcategories_id, active, images }: AddDish): Promise<void> {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const [addDishResult] = await conn.execute<ResultSetHeader>("INSERT INTO dishes (name, weight, price, frozen, spicy, ingredients, subcategories_id, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, weight, price, frozen, spicy, ingredients, subcategories_id, active])
        
        for(const image of images){
            const { title, image_url } = image
            await conn.execute("INSERT INTO dish_image (title, image_url, dish_id) VALUES (?, ?, ?)", [title, image_url, addDishResult.insertId])
        }

        await conn.commit()
    } catch (error) {
        await conn.rollback()
        throw new Error((error as Error).message)
    } finally{
        conn.release()
    }
}

export async function updateDish({ id }: DishId, { name, weight, price, frozen, spicy, ingredients, subcategories_id, active, images }: UpdateDish): Promise<void> {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        await conn.execute<ResultSetHeader>("UPDATE dishes SET name = ?, weight = ?, price = ?, frozen = ?, spicy = ?, ingredients = ?, subcategories_id = ?, active = ? WHERE id = ?", [name, weight, price, frozen, spicy, ingredients, subcategories_id, active, id])
    
        for(const image of images){
            const { title, image_url } = image
            await conn.execute("INSERT INTO dish_image (title, image_url, dish_id) VALUES (?, ?, ?)", [title, image_url, id])
        }

        await conn.commit()
    } catch (error) {
        await conn.rollback()
        throw new Error((error as Error).message)
    } finally{
        conn.release()
    }
}

export async function deleteDish({ id }: DishId): Promise<void> {
    try {
        await pool.execute("DELETE FROM dishes WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteCommentUserById({ id }: DeleteCommentUserById): Promise<void> {
    try {
        await pool.execute("DELETE FROM dish_comments WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}