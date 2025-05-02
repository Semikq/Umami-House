import { pool } from "../../pool";

export async function addPartners({name, logo, link_website, active}){
    try {
        const [rows] = await pool.execute("INSERT INTO partners (name, logo, link_website, active) VALUES (?, ?, ?, ?)", [name, logo, link_website, active])
        return rows
    }catch (err){
        throw new Error(err.message)
    }
}

export async function updatePartners(active, id){
    try {
        const [rows] = await pool.execute("UPDATE partners SET active = ? WHERE id = ?", [active, id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deletePartners(id){
    try {
        const [rows] = await pool.execute("DELETE FROM partners WHERE id = ?", [id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}