import {Id, AddOrder} from "../TypesModel/ordersTypes.js";
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

export async function addOrder({ user_id, delivery_address, payment_method, dishes, total_price }: AddOrder): Promise<void> {
    try {
         await prisma.$transaction(async tx => {
             const { id } = await tx.orders.create({ data: { user_id, delivery_address, payment_method, total_price }})

             const orderDishesData: Prisma.order_dishCreateManyInput[] = dishes.map((dish) => ({
                 order_id: id,
                 dish_id: dish.id,
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

export async function deleteOrder({ id }: Id): Promise<void> {
    try {
        await prisma.orders.delete({ where: { id } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}