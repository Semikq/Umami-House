import {createSlice} from "@reduxjs/toolkit"

interface UIState {
    showAuth: boolean
    showCart: boolean
}

const initialState: UIState = {
    showAuth: false,
    showCart: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showAuth: (state) => {
            state.showAuth = !state.showAuth
        },
        showCart: (state) => {
            state.showCart = !state.showCart
        }
    }
})

export const {showAuth, showCart} = uiSlice.actions
export default uiSlice.reducer