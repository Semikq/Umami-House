import { PrismaClient } from "@prisma/client";
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
};
export async function findUserByUuid({ uuid }) {
    try {
        return await prisma.users.findUniqueOrThrow({
            where: { uuid },
            select: userSelect,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateUserCity({ uuid }, city_uuid) {
    try {
        await prisma.users.update({
            where: { uuid },
            data: { cities: { connect: { uuid: city_uuid } } },
        });
        return findUserByUuid({ uuid });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateUser({ uuid }, { email, password, name, surname, phone, company_type, company_name, city_uuid }) {
    try {
        const data = { email, name, surname, phone, company_type, company_name };
        if (password)
            data.password = password;
        if (city_uuid !== undefined) {
            data.cities = city_uuid ? { connect: { uuid: city_uuid } } : { disconnect: true };
        }
        await prisma.users.update({
            where: { uuid },
            data
        });
        return findUserByUuid({ uuid });
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
