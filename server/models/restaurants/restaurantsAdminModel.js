import { pool } from "../../pool";

export async function addRestaurant({ name, address, phone, description, active, latitude, longitude }){
    try {
        const [rows] = await pool.execute("INSERT INTO restaurants (name, address, phone, description, active, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, phone, description, active, latitude, longitude])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function updateRestaurant({ name, address, phone, description, active, latitude, longitude, id }){
    try {
        const [rows] = await pool.execute("UPDATE restaurtants SET name = ?, address = ?, phone = ?, description = ?, active = ?, latitude = ?, longitude = ? WHERE id = ?", [name, address, phone, description, active, latitude, longitude, id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function deleteRestaurant({ id }) {
    try {
        const [rows] = await pool.execute("DELETE FROM restaurtants WHERE id = ?", [id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}