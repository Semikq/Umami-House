import {Categories, Category, Dish} from "../redux/types/dishes.ts";

export type DishImageItem = {
    title: string,
    image_url: string,
};

export function sanitizeDishImages(images: unknown): DishImageItem[] {
    if (!Array.isArray(images)) return [];

    return images
        .filter((item): item is DishImageItem => (
            Boolean(item)
            && typeof item === "object"
            && typeof (item as DishImageItem).image_url === "string"
            && (item as DishImageItem).image_url.trim().length > 0
        ))
        .map((item) => ({
            title: item.title?.trim() || "Фото",
            image_url: item.image_url.trim(),
        }));
}

export function parseUploadedImage(response: unknown): DishImageItem {
    if (response && typeof response === "object") {
        const wrapped = response as { data?: { title?: string, image_url?: string } };
        if (wrapped.data?.image_url) {
            return {
                title: wrapped.data.title?.trim() || "Фото",
                image_url: wrapped.data.image_url,
            };
        }

        const direct = response as { title?: string, image_url?: string };
        if (direct.image_url) {
            return {
                title: direct.title?.trim() || "Фото",
                image_url: direct.image_url,
            };
        }
    }

    throw new Error("Invalid image upload response");
}

export function normalizeDish(dish: Dish): Dish {
    return {
        ...dish,
        dish_images: sanitizeDishImages(dish.dish_images) as Dish["dish_images"],
    };
}

export function normalizeCategoryWithDishes(category: Category): Category {
    return {
        ...category,
        sub_categories: (category.sub_categories ?? [])
            .filter(Boolean)
            .map((sub) => ({
                ...sub,
                dishes: (sub.dishes ?? [])
                    .filter((dish): dish is Dish => Boolean(dish?.uuid))
                    .map((dish) => normalizeDish(dish)),
            })),
    };
}

export function sanitizeCategories(categories: unknown): Categories[] {
    if (!Array.isArray(categories)) return [];

    return categories.filter(
        (category): category is Categories => (
            Boolean(category)
            && typeof category === "object"
            && typeof (category as Categories).uuid === "string"
            && typeof (category as Categories).title === "string"
            && typeof (category as Categories).image_url === "string"
            && (category as Categories).image_url.trim().length > 0
        ),
    );
}
