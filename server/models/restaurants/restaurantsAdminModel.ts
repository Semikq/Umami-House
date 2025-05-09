import { pool } from "../../pool";
import { AddRestaurant, UpdateRestaurant, IdRestaurant } from "../TypesModel/restaurantsTypes";

export async function addRestaurant({ name, address, phone, description, active, latitude, longitude }: AddRestaurant): Promise<void> {
    try {
        await pool.execute("INSERT INTO restaurants (name, address, phone, description, active, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, phone, description, active, latitude, longitude])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateRestaurant({id}: IdRestaurant, { name, address, phone, description, active, latitude, longitude }: UpdateRestaurant): Promise<void> {
    try {
        await pool.execute("UPDATE restaurants SET name = ?, address = ?, phone = ?, description = ?, active = ?, latitude = ?, longitude = ? WHERE id = ?", [name, address, phone, description, active, latitude, longitude, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteRestaurant({ id }: IdRestaurant): Promise<void> {
    try {
        await pool.execute("DELETE FROM restaurants WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}