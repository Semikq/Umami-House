import { pool } from "../../config/dbConfig.js";
import { AddPartners, UpdatePartners, IdPartners } from "../TypesModel/partnersTypes.js";

export async function addPartners({ name, logo, link_website, active }: AddPartners): Promise<void> {
  try {
    await pool.query(
      "INSERT INTO umamihouse.partners (name, logo, link_website, active) VALUES ($1, $2, $3, $4)",
      [name, logo, link_website, active]
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updatePartners({ id }: IdPartners, { name, logo, link_website, active }: UpdatePartners): Promise<void> {
  try {
    await pool.query(
      "UPDATE umamihouse.partners SET name = $1, logo = $2, link_website = $3, active = $4 WHERE id = $5",
      [name, logo, link_website, active, id]
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deletePartners({ id }: IdPartners): Promise<void> {
  try {
    await pool.query("DELETE FROM umamihouse.partners WHERE id = $1", [id]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
