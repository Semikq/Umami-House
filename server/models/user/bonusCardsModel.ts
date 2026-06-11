import { PrismaClient, Prisma } from "@prisma/client";
import { Uuid } from "../TypesModel/userTypes.js";

const prisma = new PrismaClient();

const WELCOME_CARD = {
    name: "Вітальна картка",
    amount: 100,
    description: "Бонусна картка 100 ₴ для нових користувачів. Використайте її при оформленні замовлення.",
} as const;

function getWelcomeCardActiveUntil() {
    const activeUntil = new Date();
    activeUntil.setFullYear(activeUntil.getFullYear() + 1);
    return activeUntil;
}

export async function createWelcomeBonusCard(
    user_uuid: string,
    tx: Prisma.TransactionClient = prisma,
) {
    return tx.bonus_cards.create({
        data: {
            user_uuid,
            ...WELCOME_CARD,
            active_until: getWelcomeCardActiveUntil(),
            is_active: true,
        },
    });
}

export async function fetchBonusCardsByUser({ uuid }: Uuid) {
    try {
        return await prisma.bonus_cards.findMany({
            where: { user_uuid: uuid },
            orderBy: { active_until: "desc" },
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function fetchActiveBonusCardsByUser({ uuid }: Uuid) {
    try {
        return await prisma.bonus_cards.findMany({
            where: {
                user_uuid: uuid,
                is_active: true,
                active_until: { gte: new Date() },
            },
            orderBy: { amount: "desc" },
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export type CreateBonusCardInput = {
    user_uuid: string,
    name: string,
    amount: number,
    description: string,
    active_until: Date,
}

export async function createBonusCardForUser({
    user_uuid,
    name,
    amount,
    description,
    active_until,
}: CreateBonusCardInput) {
    const user = await prisma.users.findUnique({ where: { uuid: user_uuid }, select: { uuid: true } });
    if (!user) throw new Error("Користувача не знайдено");

    return prisma.bonus_cards.create({
        data: {
            user_uuid,
            name,
            amount,
            description,
            active_until,
            is_active: true,
        },
    });
}

export async function deleteBonusCardByUuid(uuid: string) {
    const card = await prisma.bonus_cards.findUnique({ where: { uuid } });
    if (!card) throw new Error("Бонусну картку не знайдено");

    await prisma.bonus_cards.delete({ where: { uuid } });
}

export async function deactivateBonusCard(uuid: string, user_uuid: string) {
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
