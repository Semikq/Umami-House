import { pool } from "../../pool"
import { AddDish, UpdateDish, DeleteDish } from "./dishTypes"
import { ResultSetHeader } from "mysql2"

export async function addDish({ name, weight, price, frozen, spicy, ingredients, subcategories_id, active, photos }: AddDish):Promise<void> {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const [addDishResult] = await conn.execute<ResultSetHeader>("INSERT INTO dishes (name, weight, price, frozen, spicy, ingredients, subcategories_id, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, weight, price, frozen, spicy, ingredients, subcategories_id, active])
        
        for(const photo of photos){
            const { title, image_url } = photo
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

export async function updateDish({ name, weight, price, frozen, spicy, ingredients, subcategories_id, active, photos, id }: UpdateDish):Promise<void> {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        await conn.execute<ResultSetHeader>("UPDATE dishes SET name = ?, weight = ?, price = ?, frozen = ?, spicy = ?, ingredients = ?, subcategories_id = ?, active = ? WHERE id = ?", [name, weight, price, frozen, spicy, ingredients, subcategories_id, active, id])
    
        for(const photo of photos){
            const { title, image_url } = photo
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

export async function deleteDish({ id }: DeleteDish):Promise<void> {
    try {
        await pool.execute("DELETE FROM dishes WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}