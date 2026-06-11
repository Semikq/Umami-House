import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CitySeed = {
    name: string;
    latitude: number;
    longitude: number;
};

type RestaurantSeed = {
    cityName: string;
    name: string;
    address: string;
    phone: string;
    description: string;
    time_work: string;
    latitude: number;
    longitude: number;
    restaurant_image: string;
};

const citiesSeed: CitySeed[] = [
    { name: "Полтава", latitude: 49.5883, longitude: 34.5514 },
    { name: "Київ", latitude: 50.4501, longitude: 30.5234 },
    { name: "Львів", latitude: 49.8397, longitude: 24.0297 },
    { name: "Харків", latitude: 49.9935, longitude: 36.2304 },
    { name: "Черкаси", latitude: 49.4444, longitude: 32.0598 },
    { name: "Дніпро", latitude: 48.4647, longitude: 35.0462 },
    { name: "Запоріжжя", latitude: 47.8388, longitude: 35.1396 },
    { name: "Миколаїв", latitude: 46.975, longitude: 31.9946 },
    { name: "Одеса", latitude: 46.4825, longitude: 30.7233 },
];

const restaurantsSeed: RestaurantSeed[] = [
    {
        cityName: "Полтава",
        name: "Umami House Полтава",
        address: "Центральна 24",
        phone: "0993233223",
        description:
            "Перший ресторан нашої мережі у Полтаві, відкритий у 2024 році, – це поєднання сучасного стилю та затишку. Теплі тони, стильні меблі та унікальні світильники у формі риб створюють атмосферу, яка надихає.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 49.5883,
        longitude: 34.5514,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Полтава",
        name: "Umami House Полтава Центр",
        address: "Центральна 22",
        phone: "0964344334",
        description:
            "Ресторан Umami House у центрі Полтави з авторською кухнею, затишною залою та швидкою доставкою страв додому.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 49.5891,
        longitude: 34.5498,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Полтава",
        name: "Umami House Полтава Сад",
        address: "Центральна 23",
        phone: "0973233223",
        description:
            "Другий ресторан мережі в Полтаві з просторою залою, зоною для родин та улюбленими ролами від шеф-кухаря.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 49.5875,
        longitude: 34.5526,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Київ",
        name: "Umami House Київ",
        address: "Хрещатик 15",
        phone: "0501234567",
        description:
            "Umami House у Києві — сучасна азійська кухня, затишна атмосфера та швидке обслуговування у центрі міста.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 50.4501,
        longitude: 30.5234,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Львів",
        name: "Umami House Львів",
        address: "Свободи 28",
        phone: "0502345678",
        description:
            "Ресторан Umami House у Львові з авторськими ролами, локшиною та затишною залою для вечерь із родиною.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 49.8397,
        longitude: 24.0297,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Харків",
        name: "Umami House Харків",
        address: "Сумська 12",
        phone: "0503456789",
        description:
            "Umami House у Харкові — простір з теплим інтер'єром, свіжими морепродуктами та зручною доставкою.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 49.9935,
        longitude: 36.2304,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Черкаси",
        name: "Umami House Черкаси",
        address: "Хрещатик 10",
        phone: "0504567890",
        description:
            "Ресторан мережі Umami House у Черкасах з улюбленими стравами азійської кухні та зручним розташуванням.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 49.4444,
        longitude: 32.0598,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Дніпро",
        name: "Umami House Дніпро",
        address: "Набережна Перемоги 5",
        phone: "0505678901",
        description:
            "Umami House у Дніпрі — сучасний ресторан з панорамною залою, ролами та локшиною на будь-який смак.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 48.4647,
        longitude: 35.0462,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Запоріжжя",
        name: "Umami House Запоріжжя",
        address: "Соборний 45",
        phone: "0506789012",
        description:
            "Ресторан Umami House у Запоріжжі з затишною атмосферою, свіжими інгредієнтами та швидким сервісом.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 47.8388,
        longitude: 35.1396,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Миколаїв",
        name: "Umami House Миколаїв",
        address: "Адміральська 18",
        phone: "0507890123",
        description:
            "Umami House у Миколаїві — місце, де поєднуються традиції азійської кухні та сучасний сервіс мережі.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 46.975,
        longitude: 31.9946,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
    {
        cityName: "Одеса",
        name: "Umami House Одеса",
        address: "Дерибасівська 7",
        phone: "0508901234",
        description:
            "Umami House в Одесі з морським настроєм, свіжими морепродуктами та затишною залою біля центру.",
        time_work: "Пн-нд 10:00 - 23:00",
        latitude: 46.4825,
        longitude: 30.7233,
        restaurant_image: "/uploads/company/Umami-House_Restaurant.png",
    },
];

async function seedCitiesAndRestaurants() {
    for (const city of citiesSeed) {
        const existingCity = await prisma.cities.findFirst({
            where: { name: city.name },
        });

        if (existingCity) {
            await prisma.cities.update({
                where: { uuid: existingCity.uuid },
                data: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                },
            });
            continue;
        }

        await prisma.cities.create({
            data: {
                name: city.name,
                latitude: city.latitude,
                longitude: city.longitude,
            },
        });
    }

    let createdCount = 0;

    for (const restaurant of restaurantsSeed) {
        const city = await prisma.cities.findFirst({
            where: { name: restaurant.cityName },
        });

        if (!city) {
            console.warn(`Місто не знайдено: ${restaurant.cityName}`);
            continue;
        }

        const existingRestaurant = await prisma.restaurants.findFirst({
            where: {
                city_uuid: city.uuid,
                address: restaurant.address,
            },
        });

        if (existingRestaurant) {
            await prisma.restaurants.update({
                where: { uuid: existingRestaurant.uuid },
                data: {
                    name: restaurant.name,
                    phone: restaurant.phone,
                    description: restaurant.description,
                    time_work: restaurant.time_work,
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                    restaurant_image: restaurant.restaurant_image,
                    active: true,
                },
            });
            continue;
        }

        await prisma.restaurants.create({
            data: {
                city_uuid: city.uuid,
                name: restaurant.name,
                address: restaurant.address,
                phone: restaurant.phone,
                description: restaurant.description,
                time_work: restaurant.time_work,
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
                restaurant_image: restaurant.restaurant_image,
                active: true,
            },
        });
        createdCount++;
    }

    console.log(`Міст: ${citiesSeed.length}. Нових ресторанів: ${createdCount}.`);
}

type DishSeed = {
    name: string;
    weight: number;
    price: number;
    ingredients: string;
    frozen?: boolean;
    spicy?: boolean;
    image: string;
};

type SubCategorySeed = {
    name: string;
    dishes: DishSeed[];
};

type CategorySeed = {
    title: string;
    subCategories: SubCategorySeed[];
};

const menuSeed: CategorySeed[] = [
    {
        title: "Салати",
        subCategories: [
            {
                name: "Свіжі салати",
                dishes: [
                    {
                        name: "Салат з лососем та авокадо",
                        weight: 180,
                        price: 320,
                        ingredients: "Лосось, авокадо, мікс салату, огірок, лимон, оливкова олія, кунжут",
                        image: "/uploads/menu/salads.jpg",
                    },
                    {
                        name: "Салат Цезар з креветками",
                        weight: 200,
                        price: 290,
                        ingredients: "Креветки, romaine, пармезан, croutons, соус Цезар, часник",
                        image: "/uploads/menu/salads.jpg",
                    },
                    {
                        name: "Овочевий салат з кунжутною заправкою",
                        weight: 150,
                        price: 180,
                        ingredients: "Морква, огірок, перець, капуста, кунжут, рисовий оцет, соєвий соус",
                        image: "/uploads/menu/salads.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "Суші меню",
        subCategories: [
            {
                name: "Роли",
                dishes: [
                    {
                        name: "Філадельфія з лососем",
                        weight: 250,
                        price: 360,
                        ingredients: "Рис, лосось, вершковий сир, норі, огірок, кунжут",
                        image: "/uploads/menu/sushiMenu.webp",
                    },
                    {
                        name: "Каліфорнія з крабом",
                        weight: 240,
                        price: 310,
                        ingredients: "Рис, краб, авокадо, огірок, ікра тобіко, норі",
                        image: "/uploads/menu/sushiMenu.webp",
                    },
                    {
                        name: "Дракон з вугрем",
                        weight: 280,
                        price: 420,
                        ingredients: "Рис, вугор, авокадо, огірок, соус унагі, кунжут",
                        image: "/uploads/menu/sushiMenu.webp",
                    },
                ],
            },
            {
                name: "Нігірі та саші",
                dishes: [
                    {
                        name: "Саші з тунцем",
                        weight: 120,
                        price: 280,
                        ingredients: "Рис суші, тунець, васабі, імбир маринований, соєвий соус",
                        spicy: true,
                        image: "/uploads/menu/sushiMenu.webp",
                    },
                    {
                        name: "Нігірі з лососем",
                        weight: 100,
                        price: 240,
                        ingredients: "Рис суші, лосось, васабі, імбир маринований",
                        image: "/uploads/menu/sushiMenu.webp",
                    },
                ],
            },
        ],
    },
    {
        title: "Локшина",
        subCategories: [
            {
                name: "Гарячі страви",
                dishes: [
                    {
                        name: "Локшина рамен з куркою",
                        weight: 350,
                        price: 260,
                        ingredients: "Локшина рамен, курка, яйце, зелена цибуля, бульйон, соєвий соус",
                        image: "/uploads/menu/noodles.jpg",
                    },
                    {
                        name: "Удон з овочами та тофу",
                        weight: 320,
                        price: 230,
                        ingredients: "Локшина удон, тофу, морква, перець, броколі, кунжут, соєвий соус",
                        image: "/uploads/menu/noodles.jpg",
                    },
                    {
                        name: "Смажена локшина з креветками",
                        weight: 300,
                        price: 340,
                        ingredients: "Локшина, креветки, часник, імбир, соєвий соус, зелена цибуля",
                        spicy: true,
                        image: "/uploads/menu/noodles.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "М'ясо",
        subCategories: [
            {
                name: "Гарячі страви",
                dishes: [
                    {
                        name: "Свинина теріякі з рисом",
                        weight: 320,
                        price: 310,
                        ingredients: "Свинина, рис, соус теріякі, кунжут, зелена цибуля, овочі",
                        image: "/uploads/menu/meat.webp",
                    },
                    {
                        name: "Курка в кисло-солодкому соусі",
                        weight: 300,
                        price: 280,
                        ingredients: "Курка, перець, ананас, кисло-солодкий соус, рис",
                        image: "/uploads/menu/meat.webp",
                    },
                    {
                        name: "Яловичина по-сzechuan",
                        weight: 280,
                        price: 350,
                        ingredients: "Яловичина, перець чилі, часник, імбир, соєвий соус, кунжут",
                        spicy: true,
                        image: "/uploads/menu/meat.webp",
                    },
                ],
            },
        ],
    },
    {
        title: "Супи",
        subCategories: [
            {
                name: "Традиційні супи",
                dishes: [
                    {
                        name: "Місо суп з тофу",
                        weight: 300,
                        price: 160,
                        ingredients: "Бульйон дасі, паста місо, тофу, водорості, зелена цибуля",
                        image: "/uploads/menu/soups.jpg",
                    },
                    {
                        name: "Том ям з креветками",
                        weight: 350,
                        price: 290,
                        ingredients: "Креветки, гриби, лемонграс, галангал, листя кафрського лайма, кокосове молоко",
                        spicy: true,
                        image: "/uploads/menu/soups.jpg",
                    },
                    {
                        name: "Курячий суп з локшиною",
                        weight: 400,
                        price: 190,
                        ingredients: "Курка, локшина, морква, цибуля, зелень, спеції",
                        image: "/uploads/menu/soups.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "Морепродукти",
        subCategories: [
            {
                name: "Гарячі страви",
                dishes: [
                    {
                        name: "Смажений лосось з томатами та спаржею",
                        weight: 240,
                        price: 480,
                        ingredients: "Лосось, спаржа, томати, розмарин, лимон, суміш перців, сіль, оливкова олія",
                        spicy: true,
                        frozen: true,
                        image: "/uploads/dishes/salmon.jpg",
                    },
                    {
                        name: "Креветки темпура з соусом унагі",
                        weight: 200,
                        price: 420,
                        ingredients: "Креветки, темпурне тісто, соус унагі, кунжут, зелена цибуля",
                        image: "/uploads/dishes/salmon.jpg",
                    },
                    {
                        name: "Риба на пару з імбирем і соєвим соусом",
                        weight: 220,
                        price: 390,
                        ingredients: "Філе білої риби, імбир, зелена цибуля, соєвий соус, кунжут",
                        frozen: true,
                        image: "/uploads/menu/seafood.jpg",
                    },
                ],
            },
            {
                name: "Охолоджені морепродукти",
                dishes: [
                    {
                        name: "Тартар з тунця",
                        weight: 150,
                        price: 360,
                        ingredients: "Тунець, авокадо, огірок, соус ponzu, кунжут, мікрогрін",
                        image: "/uploads/menu/seafood.jpg",
                    },
                    {
                        name: "Саші-мікс з морепродуктів",
                        weight: 180,
                        price: 450,
                        ingredients: "Лосось, тунець, креветка, рис, васабі, імбир, соєвий соус",
                        image: "/uploads/menu/seafood.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "Закуски",
        subCategories: [
            {
                name: "Гарячі закуски",
                dishes: [
                    {
                        name: "Спринг-роли з овочами",
                        weight: 180,
                        price: 170,
                        ingredients: "Овочі, рисове тісто, кунжут, соус sweet chili",
                        image: "/uploads/menu/appetizer.jpg",
                    },
                    {
                        name: "Гьoza зі свининою",
                        weight: 200,
                        price: 210,
                        ingredients: "Тісто, свинина, капуста, імбир, часник, соєвий соус",
                        image: "/uploads/menu/appetizer.jpg",
                    },
                    {
                        name: "Курячі крильця в азійському соусі",
                        weight: 250,
                        price: 240,
                        ingredients: "Курячі крила, мед, соєвий соус, часник, кунжут",
                        spicy: true,
                        image: "/uploads/menu/appetizer.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "Напої",
        subCategories: [
            {
                name: "Холодні напої",
                dishes: [
                    {
                        name: "Матча лatte",
                        weight: 300,
                        price: 120,
                        ingredients: "Матча, молоко, лід, мед за бажанням",
                        image: "/uploads/menu/drinks.jpg",
                    },
                    {
                        name: "Лимонад yuzu-м'ята",
                        weight: 350,
                        price: 110,
                        ingredients: "Yuzu, м'ята, лимон, цукор, газована вода",
                        image: "/uploads/menu/drinks.jpg",
                    },
                    {
                        name: "Манго-smoothie",
                        weight: 400,
                        price: 130,
                        ingredients: "Манго, банан, йогурт, мед, лід",
                        image: "/uploads/menu/drinks.jpg",
                    },
                ],
            },
            {
                name: "Гарячі напої",
                dishes: [
                    {
                        name: "Зелений чай сенcha",
                        weight: 250,
                        price: 80,
                        ingredients: "Листя зеленого чаю sencha, вода",
                        image: "/uploads/menu/drinks.jpg",
                    },
                    {
                        name: "Імбирний чай з медом",
                        weight: 250,
                        price: 90,
                        ingredients: "Імбир, мед, лимон, вода",
                        image: "/uploads/menu/drinks.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "Десерти",
        subCategories: [
            {
                name: "Азійські десерти",
                dishes: [
                    {
                        name: "Мochi з манго",
                        weight: 120,
                        price: 140,
                        ingredients: "Рисове борошно, манго, цукор, кокосове молоко",
                        image: "/uploads/menu/desserts.jpg",
                    },
                    {
                        name: "Моті з зеленим чаєм",
                        weight: 120,
                        price: 150,
                        ingredients: "Рисове борошно, матча, бобова паста, цукор",
                        image: "/uploads/menu/desserts.jpg",
                    },
                    {
                        name: "Банановий темпura з медом",
                        weight: 150,
                        price: 160,
                        ingredients: "Банан, темпурне тісто, мед, морозиво ваніль",
                        image: "/uploads/menu/desserts.jpg",
                    },
                ],
            },
        ],
    },
    {
        title: "Наша продукція",
        subCategories: [
            {
                name: "Заморожені страви",
                dishes: [
                    {
                        name: "Набір «Umami House» для двох",
                        weight: 600,
                        price: 890,
                        ingredients: "Лосось, рис, овочі, соуси, набір для домашнього приготування",
                        frozen: true,
                        image: "/uploads/menu/ourProducts.jpg",
                    },
                    {
                        name: "Заморожені гьoza — 12 шт",
                        weight: 360,
                        price: 320,
                        ingredients: "Тісто, свинина, капуста, імбир, часник",
                        frozen: true,
                        image: "/uploads/menu/ourProducts.jpg",
                    },
                    {
                        name: "Лосось шокового заморожування",
                        weight: 500,
                        price: 650,
                        ingredients: "Філе лосося, без добавок, шокове заморожування",
                        frozen: true,
                        image: "/uploads/dishes/salmon.jpg",
                    },
                ],
            },
        ],
    },
];

async function seedMenu() {
    const categories = await prisma.categories.findMany();
    const categoryByTitle = new Map(categories.map((c) => [c.title, c.uuid]));

    const existingSubCategories = await prisma.sub_categories.count();
    if (existingSubCategories > 0) {
        console.log("Підкатегорії вже існують — пропускаю seed меню.");
        return;
    }

    let dishCount = 0;

    for (const category of menuSeed) {
        const categoryUuid = categoryByTitle.get(category.title);
        if (!categoryUuid) {
            console.warn(`Категорію не знайдено: ${category.title}`);
            continue;
        }

        for (const subCategory of category.subCategories) {
            const createdSubCategory = await prisma.sub_categories.create({
                data: {
                    name: subCategory.name,
                    category_uuid: categoryUuid,
                },
            });

            for (const dish of subCategory.dishes) {
                await prisma.dishes.create({
                    data: {
                        name: dish.name,
                        weight: dish.weight,
                        price: dish.price,
                        ingredients: dish.ingredients,
                        frozen: dish.frozen ?? false,
                        spicy: dish.spicy ?? false,
                        active: true,
                        sub_category_uuid: createdSubCategory.uuid,
                        dish_images: {
                            create: {
                                title: dish.name,
                                image_url: dish.image,
                            },
                        },
                    },
                });
                dishCount++;
            }
        }
    }

    console.log(`Додано ${dishCount} страв у ${menuSeed.length} категоріях.`);
}

async function cleanupTestBonusCards() {
    const result = await prisma.bonus_cards.deleteMany({
        where: { name: "Святкова картка Umami" },
    });

    if (result.count > 0) {
        console.log(`Видалено ${result.count} тестових бонусних карток.`);
    }
}

async function deactivateUsedBonusCards() {
    const orders = await prisma.orders.findMany({
        where: { payment_method: { startsWith: "bonus_card:" } },
        select: { payment_method: true },
    });

    const cardUuids = [...new Set(
        orders
            .map((order) => order.payment_method.slice("bonus_card:".length))
            .filter((uuid) => uuid.length > 0),
    )];

    if (cardUuids.length === 0) return;

    const result = await prisma.bonus_cards.updateMany({
        where: { uuid: { in: cardUuids }, is_active: true },
        data: { is_active: false },
    });

    if (result.count > 0) {
        console.log(`Деактивовано ${result.count} використаних бонусних карток.`);
    }
}

async function main() {
    await seedCitiesAndRestaurants();
    try {
        await seedMenu();
    } catch (error) {
        console.warn("Seed меню пропущено:", error instanceof Error ? error.message : error);
    }
    try {
        await cleanupTestBonusCards();
        await deactivateUsedBonusCards();
    } catch (error) {
        console.warn("Очищення бонусних карток пропущено:", error instanceof Error ? error.message : error);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
