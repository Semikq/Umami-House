import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Restaurants, Cities, RestaurantsByCity} from "../types/restaurants.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const restaurantsApi = createApi({
    reducerPath: "restaurantsApi",
    tagTypes: ["City", "Restaurant"],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/restaurants"),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        restaurants: builder.query<Restaurants[], void>({
            query: () => "/all",
            providesTags: ["Restaurant"],
        }),
        cities: builder.query<Cities[], void>({
            query: () => "/cities",
            providesTags: ["City"],
        }),
        restaurantsByCity: builder.query<RestaurantsByCity[], string | null>({
            query: (cityUuid) => cityUuid ? `/city/${cityUuid}` : "/all",
            providesTags: (_result, _error, cityUuid) => [
                { type: "Restaurant", id: cityUuid ?? "ALL" },
            ],
        }),
        addCity: builder.mutation<Cities, { name: string }>({
            query: (body) => ({
                url: "addCity",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: Cities }) => response.data,
            invalidatesTags: ["City"],
        }),
        deleteCity: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `deleteCity/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["City", "Restaurant"],
        }),
        addRestaurant: builder.mutation<Restaurants, {
            city_uuid: string,
            name: string,
            address: string,
            phone: string,
            description: string,
            active: boolean,
            latitude: number,
            longitude: number,
            time_work: string,
            restaurant_image: string,
        }>({
            query: (body) => ({
                url: "addRestaurant",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: Restaurants }) => response.data,
            invalidatesTags: ["Restaurant", "City"],
        }),
        updateRestaurant: builder.mutation<Restaurants, {
            uuid: string,
            city_uuid: string,
            name: string,
            address: string,
            phone: string,
            description: string,
            active: boolean,
            latitude: number,
            longitude: number,
            time_work: string,
            restaurant_image: string,
        }>({
            query: ({ uuid, ...body }) => ({
                url: `updateRestaurant/${uuid}`,
                method: "PUT",
                body,
            }),
            transformResponse: (response: { data: Restaurants }) => response.data,
            invalidatesTags: ["Restaurant"],
        }),
        deleteRestaurant: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `deleteRestaurant/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Restaurant", "City"],
        }),
        uploadRestaurantImage: builder.mutation<{ image_url: string, title: string }, {
            data: string,
            mimeType: "image/jpeg" | "image/png" | "image/webp",
            title?: string,
        }>({
            query: (body) => ({
                url: "uploadImage",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: { image_url: string, title: string } }) => response.data,
        }),
    }),
});

export const {
    useRestaurantsQuery,
    useCitiesQuery,
    useRestaurantsByCityQuery,
    useAddCityMutation,
    useDeleteCityMutation,
    useAddRestaurantMutation,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,
    useUploadRestaurantImageMutation,
} = restaurantsApi;
