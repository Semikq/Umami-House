import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Restaurants, Cities} from "../types/restaurants.ts";

export const restaurantsApi = createApi({
    reducerPath: "restaurantsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/restaurants" }),
    endpoints: (builder) => ({
        restaurants: builder.query<Restaurants[], void>({ query: () => "" }),
        cities: builder.query<Cities[], void>({ query: () => "/cities" }),
    })
})

export const { useRestaurantsQuery, useCitiesQuery } = restaurantsApi