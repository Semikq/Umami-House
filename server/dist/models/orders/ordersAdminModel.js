import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function fetchOrdersByFilter({ status }) {
    try {
        return await prisma.orders.findMany({
            where: { status },
            include: {
                order_dish: {
                    include: {
                        dishes: {
                            include: {
                                dish_images: true
                            }
                        }
                    }
                }
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
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
