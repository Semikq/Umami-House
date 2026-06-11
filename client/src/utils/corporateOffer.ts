import {Dish} from "../redux/types/dishes.ts";

export const CORPORATE_TYPE_OPTIONS = [
    { value: "azs", label: "АЗС" },
    { value: "restaurant", label: "Ресторан" },
    { value: "cafe", label: "Кафе" },
    { value: "hotel", label: "Готель" },
    { value: "coffee", label: "Кав'ярня" },
    { value: "other", label: "Інше" },
] as const;

const CORPORATE_TYPE_LABELS: Record<string, string> = Object.fromEntries(
    CORPORATE_TYPE_OPTIONS.map(({ value, label }) => [value, label]),
);

type CorporateUser = {
    role?: string;
    company_type?: string | null;
    company_name?: string | null;
} | null | undefined;

type CorporateDish = Pick<Dish, "price" | "corporate_type" | "wholesale_min_qty" | "wholesale_price">;

export function isCorporateUser(user: { role?: string } | null | undefined): boolean {
    return user?.role === "company";
}

export function isCorporateOrderUser(
    user: {
        role?: string;
        company_type?: string | null;
        company_name?: string | null;
    } | null | undefined,
): boolean {
    return isCorporateClient(user);
}

export function isCorporateClient(user: CorporateUser): boolean {
    return isCorporateUser(user) || Boolean(user?.company_type || user?.company_name);
}

export function getCorporateTypeLabel(type: string | null | undefined): string {
    if (!type) return "—";
    return CORPORATE_TYPE_LABELS[type] ?? type;
}

export function hasCorporateOfferForUser(
    dish: Pick<Dish, "corporate_type">,
    user: CorporateUser,
): boolean {
    if (!isCorporateClient(user) || !dish.corporate_type || !user?.company_type) {
        return false;
    }
    return dish.corporate_type === user.company_type;
}

export function hasCorporateSpecialPrice(
    dish: CorporateDish,
    user: CorporateUser,
    quantity = 1,
): boolean {
    if (!hasCorporateOfferForUser(dish, user) || dish.wholesale_price == null) {
        return false;
    }
    if (dish.wholesale_min_qty != null && quantity < dish.wholesale_min_qty) {
        return false;
    }
    return true;
}

export function getCorporateDishPrice(
    dish: CorporateDish,
    user: CorporateUser,
    quantity = 1,
): number {
    if (hasCorporateSpecialPrice(dish, user, quantity)) {
        return dish.wholesale_price as number;
    }
    return dish.price;
}

export type CartPricingMeta = {
    retailPrice: number;
    wholesalePrice: number | null;
    wholesaleMinQty: number | null;
    corporateMatched: boolean;
};

export function recalcCartDishUnitPrice(
    item: Pick<CartPricingMeta, "retailPrice" | "wholesalePrice" | "wholesaleMinQty" | "corporateMatched"> & {
        count?: number;
    },
): number {
    const count = item.count ?? 1;
    if (item.corporateMatched && item.wholesalePrice != null) {
        if (item.wholesaleMinQty == null || count >= item.wholesaleMinQty) {
            return item.wholesalePrice;
        }
    }
    return item.retailPrice;
}

export function prepareCartDish<T extends Dish>(
    dish: T,
    user: CorporateUser,
    quantity = 1,
): T & CartPricingMeta {
    const corporateMatched = hasCorporateOfferForUser(dish, user);
    const retailPrice = dish.price;
    const count = dish.count ?? quantity;

    return {
        ...dish,
        count,
        retailPrice,
        wholesalePrice: dish.wholesale_price ?? null,
        wholesaleMinQty: dish.wholesale_min_qty ?? null,
        corporateMatched,
        price: getCorporateDishPrice(dish, user, count),
    };
}

/** @deprecated Use prepareCartDish */
export function withCorporatePricing<T extends Dish>(
    dish: T,
    user: CorporateUser,
    quantity = 1,
): T & CartPricingMeta {
    return prepareCartDish(dish, user, quantity);
}

export function getCartLinePricing(
    dish: Pick<CartPricingMeta, "retailPrice" | "wholesalePrice" | "wholesaleMinQty" | "corporateMatched" | "price"> & {
        count?: number;
    },
): {
    retailTotal: number;
    lineTotal: number;
    wholesaleActive: boolean;
    unitPrice: number;
} {
    const count = dish.count ?? 1;
    const retailPrice = dish.retailPrice ?? dish.price;
    const unitPrice = dish.price;
    const retailTotal = retailPrice * count;
    const lineTotal = unitPrice * count;
    const wholesaleActive = dish.corporateMatched
        && dish.wholesalePrice != null
        && unitPrice === dish.wholesalePrice;

    return { retailTotal, lineTotal, wholesaleActive, unitPrice };
}

export type CorporateDeliveryAddress = {
    streetAddress: string;
    exactLocation: string;
    responsiblePerson: string;
    contactPhone: string;
    deliveryDate: string;
};

export function formatCorporateDeliveryAddress(fields: CorporateDeliveryAddress): string {
    const streetAddress = fields.streetAddress.trim();
    const exactLocation = fields.exactLocation.trim();
    const responsiblePerson = fields.responsiblePerson.trim();
    const contactPhone = fields.contactPhone.trim();
    const deliveryDate = fields.deliveryDate.trim();

    const parts = [
        streetAddress && `Вулиця: ${streetAddress}`,
        exactLocation && `Точна локація: ${exactLocation}`,
        responsiblePerson && `Особа, яка приймає: ${responsiblePerson}`,
        contactPhone && `Телефон: ${contactPhone}`,
        deliveryDate && `Дата доставки: ${formatDeliveryDateLabel(deliveryDate)}`,
    ].filter(Boolean);

    return parts.join(" | ");
}

function formatDeliveryDateLabel(isoDate: string): string {
    const [year, month, day] = isoDate.split("-");
    if (!year || !month || !day) return isoDate;
    return `${day}.${month}.${year}`;
}

export function isCorporateRecommendedDish(
    dish: Pick<Dish, "active" | "corporate_type" | "wholesale_price" | "dish_images">,
    user: CorporateUser,
): boolean {
    if (!isCorporateClient(user) || !user?.company_type) {
        return false;
    }
    if (!dish.active || !dish.dish_images?.length) {
        return false;
    }
    return dish.corporate_type === user.company_type && dish.wholesale_price != null;
}

export function filterCorporateRecommendedDishes<T extends Dish>(
    dishes: T[],
    user: CorporateUser,
): T[] {
    return dishes.filter((dish) => isCorporateRecommendedDish(dish, user));
}

export function getWholesaleCartLabel(
    dish: Pick<CartPricingMeta, "wholesalePrice" | "wholesaleMinQty" | "corporateMatched"> & { count?: number },
): string | null {
    const count = dish.count ?? 1;
    if (!dish.corporateMatched || dish.wholesalePrice == null) return null;
    if (dish.wholesaleMinQty != null && count < dish.wholesaleMinQty) return null;
    if (dish.wholesaleMinQty != null && dish.wholesaleMinQty > 1) {
        return `Опт ${dish.wholesalePrice} ₴/шт`;
    }
    return `Спец. ціна ${dish.wholesalePrice} ₴/шт`;
}

export function getCorporateOfferBadgeLabel(
    dish: CorporateDish,
    user: CorporateUser,
): string | null {
    if (!hasCorporateOfferForUser(dish, user) || dish.wholesale_price == null) {
        return null;
    }
    if (dish.wholesale_min_qty != null && dish.wholesale_min_qty > 1) {
        return `Опт від ${dish.wholesale_min_qty} шт`;
    }
    return "Спец. пропозиція";
}

export function getCorporateOfferLabel(
    dish: CorporateDish,
): string | null {
    if (!dish.corporate_type) return null;

    const typeLabel = CORPORATE_TYPE_LABELS[dish.corporate_type] ?? dish.corporate_type;

    if (dish.wholesale_price != null && dish.wholesale_min_qty != null && dish.wholesale_min_qty > 1) {
        return `Спеціальна пропозиція для ${typeLabel} • опт від ${dish.wholesale_min_qty} шт — ${dish.wholesale_price} ₴`;
    }

    if (dish.wholesale_price != null) {
        return `Спеціальна пропозиція для ${typeLabel} — ${dish.wholesale_price} ₴`;
    }

    return `Спеціальна пропозиція для ${typeLabel}`;
}
