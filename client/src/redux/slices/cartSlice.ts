import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DishDate {
    id: number,
    name: string,
    weight: number,
    frozen: boolean,
    spicy: boolean,
    price: number,
    count: number
}

interface cartState {
    dishes: DishDate[],
    totalPrice: number
}

const initialState: cartState = {
    dishes: [],
    totalPrice: 0
}

const recalcTotalPrice = (state): void => {
    state.totalPrice = state.dishes.reduce((sum, d) => sum + d.price * d.count, 0)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addDish: (state, action: PayloadAction<DishDate>): void => {
            let checkDish = state.dishes.find(d => d.id === action.payload.id)
            if(checkDish){
                checkDish.count += 1
            }else {
                state.dishes.push(action.payload)
            }
            recalcTotalPrice(state)
        },
        delDish: (state, action: PayloadAction<number>): void => {
            state.dishes = state.dishes.filter(d => d.id !== action.payload)
            recalcTotalPrice(state)
        },
        incrementCount: (state, action: PayloadAction<number>): void => {
            const dish = state.dishes.find(d => d.id === action.payload)
            if(dish){
                dish.count += 1
                recalcTotalPrice(state)
            }
        },
        decrementCount: (state, action: PayloadAction<number>): void=> {
            const dish = state.dishes.find(d => d.id === action.payload)
            if(dish && dish.count > 1){
                dish.count -= 1
                recalcTotalPrice(state)
            }
        },
        clearCart: (state): void => {
            state.dishes = []
            state.totalPrice = 0
        }
    }
})

export const { addDish, delDish, incrementCount, decrementCount, clearCart } = cartSlice.actions
export default cartSlice.reducer