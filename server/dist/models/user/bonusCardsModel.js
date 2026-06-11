import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const WELCOME_CARD = {
    name: "Вітальна картка",
    amount: 100,
    description: "Бонусна картка 100 ₴ для нових користувачів. Використайте її при оформленні замовлення.",
};
function getWelcomeCardActiveUntil() {
    const activeUntil = new Date();
    activeUntil.setFullYear(activeUntil.getFullYear() + 1);
    return activeUntil;
}
export async function createWelcomeBonusCard(user_uuid, tx = prisma) {
    return tx.bonus_cards.create({
        data: {
            user_uuid,
            ...WELCOME_CARD,
            active_until: getWelcomeCardActiveUntil(),
            is_active: true,
        },
    });
}
export async function fetchBonusCardsByUser({ uuid }) {
    try {
        return await prisma.bonus_cards.findMany({
            where: { user_uuid: uuid },
            orderBy: { active_until: "desc" },
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchActiveBonusCardsByUser({ uuid }) {
    try {
        return await prisma.bonus_cards.findMany({
            where: {
                user_uuid: uuid,
                is_active: true,
                active_until: { gte: new Date() },
            },
            orderBy: { amount: "desc" },
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deactivateBonusCard(uuid, user_uuid) {
    const card = await prisma.bonus_cards.findFirst({
        where: {
            uuid,
            user_uuid,
            is_active: true,
            active_until: { gte: new Date() },
        },
    });
    if (!card) {
        throw new Error("Бонусну картку не знайдено або вона недійсна");
    }
    await prisma.bonus_cards.update({
        where: { uuid },
        data: { is_active: false },
    });
    return card;
}
