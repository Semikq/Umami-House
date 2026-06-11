import { User, Uuid, UserRefresh } from "../TypesModel/userTypes.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const userSelect = {
    uuid: true,
    email: true,
    name: true,
    surname: true,
    phone: true,
    role: true,
    company_name: true,
    company_type: true,
    bonuses: true,
    city_uuid: true,
    created_at: true,
    cities: {
        select: {
            uuid: true,
            name: true,
        },
    },
} satisfies Prisma.usersSelect;

export async function findUserByUuid({ uuid }: Uuid): Promise<UserRefresh> {
    try {
        return await prisma.users.findUniqueOrThrow({
            where: { uuid },
            select: userSelect,
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateUserCity({ uuid }: Uuid, city_uuid: string): Promise<UserRefresh> {
    try {
        await prisma.users.update({
            where: { uuid },
            data: { cities: { connect: { uuid: city_uuid } } },
        })

        return findUserByUuid({ uuid })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateUser({ uuid }: Uuid, { email, password, name, surname, phone, company_type, company_name, city_uuid }: Partial<User> & Pick<User, "email" | "name" | "phone"> & { city_uuid?: string | null }): Promise<UserRefresh> {
    try {
        const data: Prisma.usersUpdateInput = { email, name, surname, phone, company_type, company_name }
        if (password) data.password = password
        if (city_uuid !== undefined) {
            data.cities = city_uuid ? { connect: { uuid: city_uuid } } : { disconnect: true }
        }

        await prisma.users.update({
            where: { uuid },
            data
        })

        return findUserByUuid({ uuid })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.users.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
