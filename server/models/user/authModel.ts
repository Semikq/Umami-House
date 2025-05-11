import { pool } from "../../config/dbConfig.js"
import bcrypt from "bcrypt"
import { RegisterUser, LoginUser, User, } from "../TypesModel/userTypes.js"
import { ResultSetHeader } from "mysql2"

export async function registerUser({ email, password, name, surname, phone, role, company_type, company_name }: RegisterUser): Promise<User> {
    try {
        const [result] = await pool.execute<ResultSetHeader>("INSERT INTO users (email, password, name, surname, phone, role, company_type, company_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [email, password, name, surname, phone, role, company_type, company_name])

        const [rows] = await pool.execute<User[]>("SELECT * FROM users WHERE id = ?", [result.insertId])
        return rows[0]
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function loginUser({ userInput, password }: LoginUser): Promise<User> {
    try {
        const [result] = await pool.execute<User[]>("SELECT * FROM users WHERE (email = ? OR phone = ?)", [userInput, userInput])
        if (result.length === 0) throw new Error("User not found")

        const isPasswordCorrect = await bcrypt.compare(password, result[0].password)
        if (!isPasswordCorrect) throw new Error('Invalid password')
            
        return result[0]
    } catch (error) {
        throw new Error((error as Error).message)
    }
}