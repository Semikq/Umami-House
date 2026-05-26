import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function registerUser({ email, password, name, surname, phone, company_type, company_name }) {
    try {
        return await prisma.users.create({
            data: { email, password, name, surname: surname ?? "", phone, company_type, company_name }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function loginUser({ userInput, password }) {
    try {
        const user = await prisma.users.findFirstOrThrow({
            where: { OR: [{ email: userInput }, { phone: userInput }] }
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
