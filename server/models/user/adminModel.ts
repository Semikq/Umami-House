import { changeUserRole, Uuid } from "../TypesModel/userTypes.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export type AdminUserListItem = {
    uuid: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    role: string,
    company_name: string | null,
    company_type: string | null,
    bonuses: number,
    created_at: Date,
    city_name: string | null,
    total_spent: number,
    orders_count: number,
}

export async function fetchAllUsers(): Promise<AdminUserListItem[]> {
    try {
        const users = await prisma.users.findMany({
            select: {
                uuid: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
                role: true,
                company_name: true,
                company_type: true,
                bonuses: true,
                created_at: true,
                cities: { select: { name: true } },
                orders: {
                    select: {
                        order_dish: {
                            select: {
                                count: true,
                                dishes: { select: { price: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return users.map(({ orders, cities, ...user }) => {
            const total_spent = orders.reduce((orderSum, order) => (
                orderSum + order.order_dish.reduce(
                    (dishSum, item) => dishSum + item.dishes.price * item.count,
                    0,
                )
            ), 0);

            return {
                ...user,
                city_name: cities?.name ?? null,
                total_spent,
                orders_count: orders.length,
            };
        });
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function choiceRoleUser({ uuid, role }: changeUserRole): Promise<Prisma.usersGetPayload<{}>> {
    try {
        return await prisma.users.update({
            where: { uuid },
            data: { role: role }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.users.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
