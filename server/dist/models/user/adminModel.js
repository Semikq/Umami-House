import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function fetchAllUsers() {
    try {
        return await prisma.users.findMany();
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function choiceRoleUser({ uuid, role }) {
    try {
        return await prisma.users.update({
            where: { uuid },
            data: { role: role }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteUser({ uuid }) {
    try {
        await prisma.users.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
