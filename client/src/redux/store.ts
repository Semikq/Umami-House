import {configureStore} from "@reduxjs/toolkit";
import authReduce from "./slices/authSlice.ts";
import cartReduce from "./slices/cartSlice.ts"
import uiSlice from "./slices/uiSlice.ts"
import {usersApi} from "./api/usersApi.ts";
import {restaurantsApi} from "./api/restaurantsApi.ts";
import {partnersApi} from "./api/partnersApi.ts";
import {dishesApi} from "./api/dishesApi.ts";
import {saleApi} from "./api/saleApi.ts";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

export const store = configureStore({
    reducer: {
        auth: authReduce,
        cart: cartReduce,
        ui: uiSlice,
        [usersApi.reducerPath]: usersApi.reducer,
        [restaurantsApi.reducerPath]: restaurantsApi.reducer,
        [partnersApi.reducerPath]: partnersApi.reducer,
        [dishesApi.reducerPath]: dishesApi.reducer,
        [saleApi.reducerPath]: saleApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(usersApi.middleware).concat(restaurantsApi.middleware).concat(partnersApi.middleware).concat(dishesApi.middleware).concat(saleApi.middleware)
});

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
});