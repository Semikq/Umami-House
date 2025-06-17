import { pool } from "../../config/dbConfig.js";
import { AddRestaurant, UpdateRestaurant, IdRestaurant } from "../TypesModel/restaurantsTypes.js";

export async function addRestaurant({ name, address, phone, description, active, latitude, longitude }: AddRestaurant): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO umamihouse.restaurants (name, address, phone, description, active, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, address, phone, description, active, latitude, longitude]
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateRestaurant({ id }: IdRestaurant, { name, address, phone, description, active, latitude, longitude }: UpdateRestaurant): Promise<void> {
  try {
    await pool.query(
      `UPDATE umamihouse.restaurants SET name = $1, address = $2, phone = $3, description = $4, active = $5, latitude = $6, longitude = $7 WHERE id = $8`,
      [name, address, phone, description, active, latitude, longitude, id]
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteRestaurant({ id }: IdRestaurant): Promise<void> {
  try {
    await pool.query("DELETE FROM umamihouse.restaurants WHERE id = $1", [id]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
