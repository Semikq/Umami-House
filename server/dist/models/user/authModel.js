import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { createWelcomeBonusCard } from "./bonusCardsModel.js";
const prisma = new PrismaClient();
export async function registerUser({ email, password, name, surname, phone, company_type, company_name, city_uuid }) {
    try {
        return await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: { email, password, name, surname: surname ?? "", phone, company_type, company_name, city_uuid: city_uuid ?? null },
            });
            await createWelcomeBonusCard(user.uuid, tx);
            return user;
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function loginUser({ userInput, password }) {
    try {
        const user = await prisma.users.findFirstOrThrow({
            where: { email: userInput }
        });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            throw new Error('Invalid password');
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
