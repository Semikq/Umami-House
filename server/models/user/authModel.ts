import bcrypt from "bcryptjs"
import { LoginUser } from "../TypesModel/userTypes.js"
import { Prisma, PrismaClient } from "@prisma/client"
import { createWelcomeBonusCard } from "./bonusCardsModel.js"
const prisma = new PrismaClient()

type RegisterUserInput = {
    email: string
    password: string
    name: string
    surname?: string
    phone: string
    company_type?: string | null
    company_name?: string | null
    city_uuid?: string | null
}

export const EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
export const USER_NOT_FOUND = "USER_NOT_FOUND"
export const INVALID_PASSWORD = "INVALID_PASSWORD"

export async function registerUser({ email, password, name, surname, phone, company_type, company_name, city_uuid }: RegisterUserInput) {
    try {
        const normalizedEmail = email.trim().toLowerCase()
        const existingUser = await prisma.users.findFirst({
            where: { email: { equals: normalizedEmail, mode: "insensitive" } },
            select: { uuid: true },
        })

        if (existingUser) {
            const error = new Error("Таку пошту вже зареєстровано")
            error.name = EMAIL_ALREADY_EXISTS
            throw error
        }

        const isCompany = Boolean(company_type?.trim() || company_name?.trim());

        return await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    email: normalizedEmail,
                    password,
                    name,
                    surname: surname ?? "",
                    phone,
                    company_type: isCompany ? company_type?.trim() || null : null,
                    company_name: isCompany ? company_name?.trim() || null : null,
                    city_uuid: city_uuid ?? null,
                    role: isCompany ? "company" : "user",
                },
            });

            await createWelcomeBonusCard(user.uuid, tx);

            return user;
        });
    } catch (error) {
        if ((error as Error).name === EMAIL_ALREADY_EXISTS) {
            throw error
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            const duplicateError = new Error("Таку пошту вже зареєстровано")
            duplicateError.name = EMAIL_ALREADY_EXISTS
            throw duplicateError
        }

        throw new Error((error as Error).message)
    }
}

export async function loginUser({ userInput, password }: LoginUser): Promise<Prisma.usersGetPayload<{}>> {
    const normalizedInput = userInput.trim().toLowerCase()

    const user = await prisma.users.findFirst({
        where: { email: { equals: normalizedInput, mode: "insensitive" } },
    })

    if (!user) {
        const error = new Error("Такого акаунту не існує")
        error.name = USER_NOT_FOUND
        throw error
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error("Невірний пароль")
        error.name = INVALID_PASSWORD
        throw error
    }

    return user
}
