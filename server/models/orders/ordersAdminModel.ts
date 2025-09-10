import { Id, OrdersByFilter, UpdateStatusOrder } from "../TypesModel/ordersTypes.js";
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

export async function fetchOrdersByFilter({ status }: OrdersByFilter): Promise<Prisma.ordersGetPayload<{
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
}>[]> {
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
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function updateStatusOrder({ id }: Id, { status }: UpdateStatusOrder): Promise<Prisma.ordersGetPayload<{}>> {
    try {
        return await prisma.orders.update({
            data: { status },
            where: { id }
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