import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function fetchOrdersByUser({ uuid }) {
    try {
        return await prisma.orders.findMany({
            where: { user_uuid: uuid },
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
export async function addOrder({ user_uuid, delivery_address, payment_method, dishes, total_price }) {
    try {
        await prisma.$transaction(async (tx) => {
            const { uuid: orderUuid } = await tx.orders.create({ data: { user_uuid, delivery_address, payment_method, total_price } });
            const orderDishesData = dishes.map((dish) => ({
                order_uuid: orderUuid,
                dish_uuid: dish.uuid,
                count: dish.count
            }));
            await tx.order_dish.createMany({
                data: orderDishesData
            });
        });
    }
    catch (error) {
        console.error("Prisma error:", error);
        throw error;
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
