import { changeUserRole, Uuid } from "../TypesModel/userTypes.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function fetchAllUsers(): Promise<Prisma.usersGetPayload<{}>[]> {
    try {
        return await prisma.users.findMany()
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function choiceRoleUser({ uuid, role }: changeUserRole): Promise<Prisma.usersGetPayload<{}>> {
    try {
        return await prisma.users.update({
            where: { uuid },
            data: { role: role }
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
