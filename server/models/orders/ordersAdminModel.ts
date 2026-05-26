import { Uuid, OrdersByFilter, UpdateStatusOrder } from "../TypesModel/ordersTypes.js";
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

export async function updateStatusOrder({ uuid }: Uuid, { status }: UpdateStatusOrder): Promise<Prisma.ordersGetPayload<{}>> {
    try {
        return await prisma.orders.update({
            data: { status },
            where: { uuid }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteOrder({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.orders.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
