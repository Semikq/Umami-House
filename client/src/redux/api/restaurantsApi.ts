import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Restaurants, Cities, RestaurantsByCity} from "../types/restaurants.ts";

export const restaurantsApi = createApi({
    reducerPath: "restaurantsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/restaurants" }),
    endpoints: (builder) => ({
        restaurants: builder.query<Restaurants[], void>({ query: () => "" }),
        cities: builder.query<Cities[], void>({ query: () => "/cities" }),
        restaurantsByCity: builder.query<RestaurantsByCity[], number>({ query: (id) => `/city/${id}` })
    })
})

export const { useRestaurantsQuery, useCitiesQuery, useRestaurantsByCityQuery } = restaurantsApi