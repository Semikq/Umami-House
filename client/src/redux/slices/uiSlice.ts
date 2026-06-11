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
        openAuth: (state) => {
            state.showAuth = true
        },
        closeAuth: (state) => {
            state.showAuth = false
        },
        showCart: (state) => {
            state.showCart = !state.showCart
        },
        openCart: (state) => {
            state.showCart = true
        },
        closeCart: (state) => {
            state.showCart = false
        },
    }
})

export const {showAuth, openAuth, closeAuth, showCart, openCart, closeCart} = uiSlice.actions
export default uiSlice.reducer