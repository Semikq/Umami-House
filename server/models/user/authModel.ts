import { pool } from "../../pool.js"
import bcrypt from "bcrypt"

interface RegisterUser{
    email: string,
    password: string,
    name: string,
    surname?: string,
    phone: string,
    role: string,
    company_type?: string,
    company_name?: string,
    created_at: string
}

interface LoginUser{
    userInput: string,
    password: string
}

interface User{
    id: number
    email: string,
    password: string,
    name: string,
    surname?: string,
    phone: string,
    role: string,
    company_type?: string,
    company_name?: string,
    created_at: string
}

export async function registerUser({ email, password, name, surname, phone, role, company_type, company_name }: RegisterUser):Promise<void> {
    try {
        await pool.execute("INSERT INTO users (email, password, name, surname, phone, role, company_type, company_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [email, password, name, surname, phone, role, company_type, company_name])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function loginUser({ userInput, password }:LoginUser):Promise<User> {
    try {
        const [rows]: any = await pool.execute("SELECT * FROM users WHERE (email = ? OR phone = ?)", [userInput, userInput])
        if (rows.length === 0) throw new Error("User not found")
        const isPasswordCorrect = await bcrypt.compare(password, rows[0].password)
        if (!isPasswordCorrect) throw new Error('Invalid password')
        return rows[0] as User
    } catch (error) {
        throw new Error((error as Error).message)
    }
}