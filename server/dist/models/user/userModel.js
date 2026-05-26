import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function findUserByUuid({ uuid }) {
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
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateUser({ uuid }, { email, password, name, surname, phone, company_type, company_name }) {
    try {
        return await prisma.users.update({
            where: { uuid },
            data: { email, password, name, surname, phone, company_type, company_name, }
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
