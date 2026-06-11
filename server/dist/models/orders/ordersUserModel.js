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
export async function addOrder({ user_uuid, delivery_address, payment_method, dishes, total_price, bonuses_spent = 0, bonus_card_uuid, }) {
    try {
        const bonusesEarned = Math.round(total_price * 0.04);
        const resolvedBonusCardUuid = bonus_card_uuid
            ?? (payment_method.startsWith("bonus_card:")
                ? payment_method.slice("bonus_card:".length)
                : undefined);
        return await prisma.$transaction(async (tx) => {
            if (resolvedBonusCardUuid) {
                const card = await tx.bonus_cards.findFirst({
                    where: {
                        uuid: resolvedBonusCardUuid,
                        user_uuid,
                        is_active: true,
                        active_until: { gte: new Date() },
                    },
                });
                if (!card) {
                    throw new Error("Бонусну картку не знайдено або вона недійсна");
                }
                await tx.bonus_cards.update({
                    where: { uuid: resolvedBonusCardUuid },
                    data: { is_active: false },
                });
            }
            if (bonuses_spent > 0) {
                const currentUser = await tx.users.findUnique({
                    where: { uuid: user_uuid },
                    select: { bonuses: true },
                });
                if (!currentUser) {
                    throw new Error("Користувача не знайдено");
                }
                if (currentUser.bonuses < bonuses_spent) {
                    throw new Error("Недостатньо бонусів");
                }
            }
            const { uuid: orderUuid } = await tx.orders.create({ data: { user_uuid, delivery_address, payment_method, total_price } });
            const orderDishesData = dishes.map((dish) => ({
                order_uuid: orderUuid,
                dish_uuid: dish.uuid,
                count: dish.count
            }));
            await tx.order_dish.createMany({
                data: orderDishesData
            });
            const bonusDelta = bonusesEarned - bonuses_spent;
            const updatedUser = await tx.users.update({
                where: { uuid: user_uuid },
                data: { bonuses: { increment: bonusDelta } },
                select: { bonuses: true },
            });
            return { bonusesEarned, bonuses: updatedUser.bonuses };
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
