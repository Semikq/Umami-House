import { User, Uuid, UserRefresh } from "../TypesModel/userTypes.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function findUserByUuid({ uuid }: Uuid): Promise<UserRefresh> {
    try {
        return await prisma.users.findUniqueOrThrow({
            where: { uuid },
            select: {
                uuid: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
                role: true,
                company_name: true,
                company_type: true,
                bonuses: true,
                created_at: true
            }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateUser({ uuid }: Uuid, { email, password, name, surname, phone, company_type, company_name }: User): Promise<Prisma.usersGetPayload<{}>> {
    try {
        return await prisma.users.update({
            where: { uuid },
            data: { email, password, name, surname, phone, company_type, company_name, }
        })
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
