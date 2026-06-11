import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getApiUrl from "../../utils/getApiUrl.ts";
import {Dish} from "../types/dishes.ts";

export interface Favorite {
    user_uuid: string;
    dish_uuid: string;
    dishes?: Dish;
}

export const favoritesApi = createApi({
    reducerPath: "favoritesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/favorites"),
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Favorites"],
    endpoints: (builder) => ({
        getFavorites: builder.query<Favorite[], string>({
            query: (userUuid) => `/user/${userUuid}/favorites`,
            providesTags: ["Favorites"],
        }),
        addFavorite: builder.mutation<Favorite, { user_uuid: string; dish_uuid: string }>({
            query: (body) => ({
                url: "/addFavorite",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Favorites"],
        }),
        deleteFavorite: builder.mutation<void, { user_uuid: string; dish_uuid: string }>({
            query: (body) => ({
                url: "/deleteFavorite",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Favorites"],
        }),
    }),
});

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
} = favoritesApi;
