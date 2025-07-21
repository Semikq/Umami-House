import { changeUserRole, Id } from "../TypesModel/userTypes";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function fetchAllUsers(): Promise<Prisma.usersGetPayload<{}>[]> {
    try {
        return await prisma.users.findMany()
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function choiceRoleUser({ id, role }: changeUserRole): Promise<Prisma.usersGetPayload<{}>> {
    try {
        return await prisma.users.update({
            where: { id },
            data: { role: role }
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