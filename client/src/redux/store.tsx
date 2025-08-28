import {configureStore} from "@reduxjs/toolkit";
import authReduce from "./reducer/authSlice.tsx";
import cartReduce from "./reducer/cartSlice.tsx"
import uiSlice from "./reducer/uiSlice.tsx"
import {api} from "./api.tsx";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

export const store = configureStore({
    reducer: {
        auth: authReduce,
        cart: cartReduce,
        ui: uiSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware),
});

store.subscribe(() => {
    const state = store.getState();
    console.log("Нове state:", state);
});