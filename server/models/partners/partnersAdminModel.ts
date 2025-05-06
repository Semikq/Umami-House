import { pool } from "../../pool";

interface AddPartners{
    name: string,
    logo: string,
    link_website?: string,
    active: boolean
}

interface UpdatePartners{
    active: boolean,
    id:number
}

interface DeletePartners{
    id:number
}

export async function addPartners({ name, logo, link_website, active }:AddPartners):Promise<void> {
    try {
        await pool.execute("INSERT INTO partners (name, logo, link_website, active) VALUES (?, ?, ?, ?)", [name, logo, link_website, active])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updatePartners({ active, id }:UpdatePartners):Promise<void> {
    try {
        await pool.execute("UPDATE partners SET active = ? WHERE id = ?", [active, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deletePartners({ id }:DeletePartners):Promise<void> {
    try {
        await pool.execute("DELETE FROM partners WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}