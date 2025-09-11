import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Categories, Category, Dish} from "../types/dishes.ts";

export const dishesApi = createApi({
    reducerPath: "dishesApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/dishes` }),
    endpoints: (builder) => ({
        categories: builder.query<Categories[], void>({ query: () => "categories" }),
        categoryWithDishes: builder.query<Category, string>({ query: (id) => `category/${id}` }),
        dish: builder.query<Dish, string>({ query: (id) => `dish/${id}` })
    })
})

export const {useCategoriesQuery, useCategoryWithDishesQuery, useDishQuery} = dishesApi