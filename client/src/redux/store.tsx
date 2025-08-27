import {configureStore} from "@reduxjs/toolkit";
import authReduce from "./reducer/authSlice.tsx";
import cartReduce from "./reducer/cartSlice.tsx"
import uiSlice from "./reducer/uiSlice.tsx"

export const store = configureStore({
    reducer: {
        auth: authReduce,
        cart: cartReduce,
        ui: uiSlice,
    }
})

store.subscribe(() => {
    const state = store.getState();
    console.log("Нове state:", state);
});