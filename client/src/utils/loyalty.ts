export const LOYALTY_TIERS = [
    { minAmount: 1500, discount: 5 },
    { minAmount: 3000, discount: 8 },
    { minAmount: 5000, discount: 12 },
] as const;

export const MAX_LOYALTY_AMOUNT = LOYALTY_TIERS[LOYALTY_TIERS.length - 1].minAmount;

export function getLoyaltyDiscountPercent(totalPrice: number) {
    let currentDiscount = 0;

    for (const tier of LOYALTY_TIERS) {
        if (totalPrice >= tier.minAmount) {
            currentDiscount = tier.discount;
        }
    }

    return currentDiscount;
}

export function getLoyaltyPricing(totalPrice: number) {
    const discountPercent = getLoyaltyDiscountPercent(totalPrice);
    const discountAmount = Math.round(totalPrice * discountPercent / 100);
    const finalPrice = totalPrice - discountAmount;

    const nextTier = LOYALTY_TIERS.find((tier) => totalPrice < tier.minAmount) ?? null;

    return {
        discountPercent,
        discountAmount,
        finalPrice,
        originalPrice: totalPrice,
        saved: discountAmount,
        nextTier,
        amountToNext: nextTier ? nextTier.minAmount - totalPrice : 0,
        progressRatio: Math.min(totalPrice / MAX_LOYALTY_AMOUNT, 1),
    };
}

export function getMaxSpendableBonuses(totalPrice: number, availableBonuses: number) {
    const { finalPrice } = getLoyaltyPricing(totalPrice);
    return Math.min(Math.max(availableBonuses, 0), Math.max(finalPrice, 0));
}

export function getBonusCardDiscount(priceAfterBonuses: number, bonusCardAmount: number) {
    if (bonusCardAmount <= 0) return 0;
    return Math.min(bonusCardAmount, Math.max(priceAfterBonuses, 0));
}

export function getOrderPricing(
    totalPrice: number,
    bonusesSpent = 0,
    bonusCardAmount = 0,
    options?: { skipLoyaltyBenefits?: boolean },
) {
    const loyalty = options?.skipLoyaltyBenefits
        ? {
            discountPercent: 0,
            discountAmount: 0,
            finalPrice: totalPrice,
            originalPrice: totalPrice,
            saved: 0,
            nextTier: null,
            amountToNext: 0,
            progressRatio: 0,
        }
        : getLoyaltyPricing(totalPrice);
    const clampedBonuses = Math.min(Math.max(bonusesSpent, 0), loyalty.finalPrice);
    const priceAfterBonuses = loyalty.finalPrice - clampedBonuses;
    const bonusCardDiscount = getBonusCardDiscount(priceAfterBonuses, bonusCardAmount);
    const payable = Math.max(priceAfterBonuses - bonusCardDiscount, 0);

    return {
        ...loyalty,
        bonusesSpent: clampedBonuses,
        bonusCardDiscount,
        bonusCardAmount,
        payable,
    };
}
