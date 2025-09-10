import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Restaurants, Cities, RestaurantsByCity} from "../types/restaurants.ts";

export const restaurantsApi = createApi({
    reducerPath: "restaurantsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/restaurants` }),
    endpoints: (builder) => ({
        restaurants: builder.query<Restaurants[], void>({ query: () => "/all" }),
        cities: builder.query<Cities[], void>({ query: () => "/cities" }),
        restaurantsByCity: builder.query<RestaurantsByCity[], number>({ query: (id) => `/city/${id}` })
    })
})

export const { useRestaurantsQuery, useCitiesQuery, useRestaurantsByCityQuery } = restaurantsApi