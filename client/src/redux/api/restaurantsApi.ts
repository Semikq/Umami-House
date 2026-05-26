import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Restaurants, Cities, RestaurantsByCity} from "../types/restaurants.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const restaurantsApi = createApi({
    reducerPath: "restaurantsApi",
    baseQuery: fetchBaseQuery({ baseUrl: getApiUrl("/restaurants") }),
    endpoints: (builder) => ({
        restaurants: builder.query<Restaurants[], void>({ query: () => "/all" }),
        cities: builder.query<Cities[], void>({ query: () => "/cities" }),
        restaurantsByCity: builder.query<RestaurantsByCity[], string | null>({
            query: (cityUuid) => cityUuid ? `/city/${cityUuid}` : "/all"
        })
    })
})

export const { useRestaurantsQuery, useCitiesQuery, useRestaurantsByCityQuery } = restaurantsApi
