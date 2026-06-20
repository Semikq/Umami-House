import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const orderInclude = {
    users: {
        select: {
            uuid: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
            role: true,
            company_type: true,
            company_name: true,
        },
    },
    order_dish: {
        include: {
            dishes: {
                include: {
                    dish_images: true,
                },
            },
        },
    },
};
export async function fetchAllOrders(status) {
    try {
        return await prisma.orders.findMany({
            where: status ? { status } : undefined,
            include: orderInclude,
            orderBy: { created_at: "desc" },
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchOrdersByFilter({ status }) {
    return fetchAllOrders(status);
}
export async function updateStatusOrder({ uuid }, { status }) {
    try {
        return await prisma.orders.update({
            data: { status },
            where: { uuid }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteOrder({ uuid }) {
    try {
        await prisma.orders.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
