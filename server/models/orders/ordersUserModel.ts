import { Uuid, AddOrder } from "../TypesModel/ordersTypes.js";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export async function fetchOrdersByUser({ uuid }: Uuid) {
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
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function addOrder({ user_uuid, delivery_address, payment_method, dishes, total_price }: AddOrder): Promise<void> {
    try {
         await prisma.$transaction(async tx => {
             const { uuid: orderUuid } = await tx.orders.create({ data: { user_uuid, delivery_address, payment_method, total_price } })

             const orderDishesData: Prisma.order_dishCreateManyInput[] = dishes.map((dish) => ({
                 order_uuid: orderUuid,
                 dish_uuid: dish.uuid,
                 count: dish.count
             }));

             await tx.order_dish.createMany({
                 data: orderDishesData
             });
        })
    } catch (error) {
        console.error("Prisma error:", error);
        throw error;
    }
}

export async function deleteOrder({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.orders.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
