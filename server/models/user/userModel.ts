import { User, Id } from "../TypesModel/userTypes";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function updateUser({ id }: Id, { email, password, name, surname, phone, company_type, company_name }: User): Promise<Prisma.usersGetPayload<{}>> {
    try {
        return await prisma.users.update({
            where: { id },
            data: { email, password, name, surname, phone, company_type, company_name, }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ id }: Id): Promise<void> {
    try {
        await prisma.users.delete({ where: { id } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}