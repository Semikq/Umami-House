import bcrypt from "bcryptjs"
import { LoginUser } from "../TypesModel/userTypes.js"
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

type RegisterUserInput = {
    email: string
    password: string
    name: string
    surname?: string
    phone: string
    company_type?: string | null
    company_name?: string | null
}

export async function registerUser({ email, password, name, surname, phone, company_type, company_name }: RegisterUserInput): Promise<Prisma.usersGetPayload<{}>> {
    try {
        return await prisma.users.create({
            data: { email, password, name, surname: surname ?? "", phone, company_type, company_name }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function loginUser({ userInput, password }: LoginUser): Promise<Prisma.usersGetPayload<{}>> {
    try {
        const user = await prisma.users.findFirstOrThrow({
            where: { OR:[{email: userInput}, {phone: userInput}] }
        })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) throw new Error('Invalid password')

        return user
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
