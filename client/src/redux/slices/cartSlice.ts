import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DishDate {
    uuid: string,
    name: string,
    weight: number,
    frozen: boolean,
    spicy: boolean,
    price: number,
    count?: number
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

const recalcTotalPrice = (state): void => {
    state.totalPrice = state.dishes.reduce((sum, d) => sum + d.price * d.count, 0)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addDish: (state, action: PayloadAction<DishDate>): void => {
            let checkDish = state.dishes.find(d => d.uuid === action.payload.uuid)
            if (checkDish?.count >= 100) return
            if(checkDish){
                checkDish.count += 1
            }else {
                state.dishes.push(action.payload)
            }
            recalcTotalPrice(state)
        },
        setCount: (state, action: PayloadAction<SetCountPayload>): void => {
            const dish = state.dishes.find(d => d.uuid === action.payload.uuid)
            if (dish){
                dish.count = action.payload.count
                recalcTotalPrice(state)
            }
        },
        delDish: (state, action: PayloadAction<string>): void => {
            state.dishes = state.dishes.filter(d => d.uuid !== action.payload)
            recalcTotalPrice(state)
        },
        incrementCount: (state, action: PayloadAction<string>): void => {
            const dish = state.dishes.find(d => d.uuid === action.payload)
            if(dish && dish.count < 100){
                dish.count += 1
                recalcTotalPrice(state)
            }
        },
        decrementCount: (state, action: PayloadAction<string>): void=> {
            const dish = state.dishes.find(d => d.uuid === action.payload)
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

export const { addDish, setCount, delDish, incrementCount, decrementCount, clearCart } = cartSlice.actions
export default cartSlice.reducer
