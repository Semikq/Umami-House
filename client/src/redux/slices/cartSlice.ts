import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartPricingMeta, recalcCartDishUnitPrice} from "../../utils/corporateOffer.ts";
import {logOut} from "./authSlice.ts";

interface DishDate extends CartPricingMeta {
    uuid: string,
    name: string,
    weight: number,
    frozen: boolean,
    spicy: boolean,
    price: number,
    count?: number,
    dish_images?: { image_url: string }[],
}

interface cartState {
    dishes: DishDate[],
    totalPrice: number
}

const initialState: cartState = {
    dishes: [],
    totalPrice: 0
}

interface SetCountPayload {
    uuid: string
    count: number
}

function syncDishUnitPrice(dish: DishDate): void {
    if (dish.retailPrice == null) {
        dish.retailPrice = dish.price;
        dish.wholesalePrice = dish.wholesalePrice ?? null;
        dish.wholesaleMinQty = dish.wholesaleMinQty ?? null;
        dish.corporateMatched = dish.corporateMatched ?? false;
    }

    dish.price = recalcCartDishUnitPrice({
        retailPrice: dish.retailPrice,
        wholesalePrice: dish.wholesalePrice,
        wholesaleMinQty: dish.wholesaleMinQty,
        corporateMatched: dish.corporateMatched,
        count: dish.count ?? 1,
    });
}

function mergeCartPricing(target: DishDate, source: DishDate): void {
    if (source.retailPrice != null) {
        target.retailPrice = source.retailPrice;
        target.wholesalePrice = source.wholesalePrice;
        target.wholesaleMinQty = source.wholesaleMinQty;
        target.corporateMatched = source.corporateMatched;
    }
}

const recalcTotalPrice = (state): void => {
    state.totalPrice = state.dishes.reduce((sum, d) => sum + d.price * (d.count ?? 1), 0)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addDish: (state, action: PayloadAction<DishDate>): void => {
            const checkDish = state.dishes.find(d => d.uuid === action.payload.uuid)
            if (checkDish?.count && checkDish.count >= 100) return

            if (checkDish) {
                checkDish.count = (checkDish.count ?? 1) + 1
                mergeCartPricing(checkDish, action.payload)
                syncDishUnitPrice(checkDish)
            } else {
                const dish = { ...action.payload }
                if (dish.retailPrice == null) {
                    dish.retailPrice = dish.price
                    dish.wholesalePrice = dish.wholesalePrice ?? null
                    dish.wholesaleMinQty = dish.wholesaleMinQty ?? null
                    dish.corporateMatched = dish.corporateMatched ?? false
                }
                syncDishUnitPrice(dish)
                state.dishes.push(dish)
            }
            recalcTotalPrice(state)
        },
        setCount: (state, action: PayloadAction<SetCountPayload>): void => {
            const dish = state.dishes.find(d => d.uuid === action.payload.uuid)
            if (dish) {
                dish.count = action.payload.count
                syncDishUnitPrice(dish)
                recalcTotalPrice(state)
            }
        },
        delDish: (state, action: PayloadAction<string>): void => {
            state.dishes = state.dishes.filter(d => d.uuid !== action.payload)
            recalcTotalPrice(state)
        },
        incrementCount: (state, action: PayloadAction<string>): void => {
            const dish = state.dishes.find(d => d.uuid === action.payload)
            if (dish && (dish.count ?? 1) < 100) {
                dish.count = (dish.count ?? 1) + 1
                syncDishUnitPrice(dish)
                recalcTotalPrice(state)
            }
        },
        decrementCount: (state, action: PayloadAction<string>): void => {
            const dish = state.dishes.find(d => d.uuid === action.payload)
            if (dish && (dish.count ?? 1) > 1) {
                dish.count = (dish.count ?? 1) - 1
                syncDishUnitPrice(dish)
                recalcTotalPrice(state)
            }
        },
        clearCart: (state): void => {
            state.dishes = []
            state.totalPrice = 0
        },
        addOrderDishes: (state, action: PayloadAction<DishDate[]>): void => {
            for (const dish of action.payload) {
                const countToAdd = Math.min(dish.count ?? 1, 100)
                const existing = state.dishes.find((d) => d.uuid === dish.uuid)

                if (existing) {
                    existing.count = Math.min(100, (existing.count ?? 1) + countToAdd)
                    mergeCartPricing(existing, dish)
                    syncDishUnitPrice(existing)
                } else {
                    const nextDish = { ...dish, count: countToAdd }
                    if (nextDish.retailPrice == null) {
                        nextDish.retailPrice = nextDish.price
                        nextDish.wholesalePrice = nextDish.wholesalePrice ?? null
                        nextDish.wholesaleMinQty = nextDish.wholesaleMinQty ?? null
                        nextDish.corporateMatched = nextDish.corporateMatched ?? false
                    }
                    syncDishUnitPrice(nextDish)
                    state.dishes.push(nextDish)
                }
            }

            recalcTotalPrice(state)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state) => {
            state.dishes = []
            state.totalPrice = 0
        })
    },
})

export const { addDish, setCount, delDish, incrementCount, decrementCount, clearCart, addOrderDishes } = cartSlice.actions
export default cartSlice.reducer
