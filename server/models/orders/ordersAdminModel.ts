import { Uuid, OrdersByFilter, UpdateStatusOrder } from "../TypesModel/ordersTypes.js";
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

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
} as const;

export type AdminOrderPayload = Prisma.ordersGetPayload<{ include: typeof orderInclude }>;

export async function fetchAllOrders(status?: string): Promise<AdminOrderPayload[]> {
    try {
        return await prisma.orders.findMany({
            where: status ? { status } : undefined,
            include: orderInclude,
            orderBy: { created_at: "desc" },
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function fetchOrdersByFilter({ status }: OrdersByFilter): Promise<AdminOrderPayload[]> {
    return fetchAllOrders(status);
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
