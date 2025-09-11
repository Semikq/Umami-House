import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Categories, Category, Dish} from "../types/dishes.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const dishesApi = createApi({
    reducerPath: "dishesApi",
    baseQuery: fetchBaseQuery({ baseUrl: getApiUrl("/dishes") }),
    endpoints: (builder) => ({
        categories: builder.query<Categories[], void>({ query: () => "categories" }),
        categoryWithDishes: builder.query<Category, string>({ query: (id) => `category/${id}` }),
        dish: builder.query<Dish, string>({ query: (id) => `dish/${id}` })
    })
})

export const {useCategoriesQuery, useCategoryWithDishesQuery, useDishQuery} = dishesApi