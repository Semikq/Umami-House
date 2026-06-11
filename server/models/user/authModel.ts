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

export async function registerUser({ email, password, name, surname, phone, company_type, company_name, city_uuid }: RegisterUserInput) {
    try {
        const isCompany = Boolean(company_type?.trim() || company_name?.trim());

        return await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    email,
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
        throw new Error((error as Error).message)
    }
}

export async function loginUser({ userInput, password }: LoginUser): Promise<Prisma.usersGetPayload<{}>> {
    try {
        const user = await prisma.users.findFirstOrThrow({
            where: { email: userInput }
        })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) throw new Error('Invalid password')

        return user
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
