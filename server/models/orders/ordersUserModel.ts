import { Id, AddOrder } from "../TypesModel/ordersTypes";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export async function fetchOrdersByUser({ id }: Id) {
    try {
        return await prisma.orders.findMany({
            where: { user_id: id },
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

export async function addOrder({ id }: Id, { user_id, status, delivery_address, payment_method, dishes }: AddOrder): Promise<void> {
    try {
        await prisma.$transaction(async tx => {
            await tx.orders.create({ data: { id, user_id, status, delivery_address, payment_method }})

            const orderDishesData: Prisma.order_dishCreateManyInput[] = dishes.map((dish) => ({
                order_id: id,
                dish_id: dish.dish_id,
                count: dish.count
            }));

            await tx.order_dish.createMany({
                data: orderDishesData
            });
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteOrder({ id }: Id): Promise<void> {
    try {
        await prisma.orders.delete({ where: { id } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}