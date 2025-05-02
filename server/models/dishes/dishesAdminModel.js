import { pool } from "../../pool"

// Adds a new dish to the database
export async function addDish(name, weight, price, frozen, spicy, ingredients, active, category_id) {
    try {
        const [rows] = await pool.execute("INSERT INTO dishes (name, weight, price, frozen, spicy, ingredients, active, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, weight, price, frozen, spicy, ingredients, active, category_id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

// Updates an existing dish in the database
export async function updateDish(name, weight, price, frozen, spicy, ingredients, active, category_id, id) {
    try {
        const [rows] = await pool.execute("UPDATE dishes SET name = ?, weight = ?, price = ?, frozen = ?, spicy = ?, ingredients = ?, active = ?, category_id = ? WHERE id = ?", [name, weight, price, frozen, spicy, ingredients, active, category_id, id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

// Deletes a dish from the database
export async function deleteDish(id) {
    try {
        const [rows] = await pool.execute("DELETE FROM dishes WHERE id = ?", [id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}




export async function addImageByDish(title, image_url, dish_id){
    try {
        const [rows] = await pool.execute("INSERT INTO dish_image (title, image_url, dish_id) VALUES (?, ?, ?)", [title, image_url, dish_id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteImageByDish(id) {
    try {
        const [rows] = await pool.execute("DELETE FROM dish_image WHERE id = ?", [id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}