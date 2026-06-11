import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@umami-house.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin123!";
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Admin";
const ADMIN_SURNAME = process.env.ADMIN_SURNAME ?? "Umami";
const ADMIN_PHONE = process.env.ADMIN_PHONE ?? "+380 00 000 00 00";

async function main() {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const existing = await prisma.users.findFirst({
        where: { email: ADMIN_EMAIL },
    });

    if (existing) {
        const user = await prisma.users.update({
            where: { uuid: existing.uuid },
            data: { role: "admin", password: hashedPassword },
        });

        console.log(`Оновлено адміна: ${user.email} (uuid: ${user.uuid})`);
        return;
    }

    const user = await prisma.users.create({
        data: {
            email: ADMIN_EMAIL,
            password: hashedPassword,
            name: ADMIN_NAME,
            surname: ADMIN_SURNAME,
            phone: ADMIN_PHONE,
            role: "admin",
        },
    });

    console.log(`Створено адміна: ${user.email} (uuid: ${user.uuid})`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
