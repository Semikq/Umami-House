import { pool } from "../../pool.js"
import bcrypt from "bcrypt"

export async function registerUser(email, password, name, surname, phone, role, company_type, company_name){
    try {
        const [rows] = await pool.execute("INSERT INTO users (email, password, name, surname, phone, role, company_type, company_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [email, password, name, surname, phone, role, company_type, company_name])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function loginUser(userInput, password) {
    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE (email = ? OR phone = ?)", [userInput])
        const isPasswordCorrect = await bcrypt.compare(password, rows[0].password)
        if (!isPasswordCorrect) throw new Error('Invalid password')
        return rows
    } catch (error) {
        throw new Error(err.message)
    }
}