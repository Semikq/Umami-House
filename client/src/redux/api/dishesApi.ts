import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Categories, Category, Dish, SubCategory} from "../types/dishes.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const dishesApi = createApi({
    reducerPath: "dishesApi",
    tagTypes: ["Dish", "MenuCategory"],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/dishes"),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        allDishes: builder.query<Dish[], void>({ query: () => "" }),
        categories: builder.query<Categories[], void>({
            query: () => "categories",
            providesTags: ["MenuCategory"],
        }),
        categoryWithDishes: builder.query<Category, string>({
            query: (uuid) => `category/${uuid}`,
            providesTags: (_result, _error, uuid) => [{ type: "MenuCategory", id: uuid }],
        }),
        dish: builder.query<Dish, string>({
            query: (uuid) => `dish/${uuid}`,
            providesTags: (_result, _error, uuid) => [{ type: "Dish", id: uuid }],
        }),
        addComment: builder.mutation({
            query: (body) => ({
                url: "addComment",
                method: "POST",
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: "Dish", id: arg.dish_uuid }],
        }),
        uploadDishImage: builder.mutation<{ title: string, image_url: string }, {
            data: string,
            mimeType: "image/jpeg" | "image/png" | "image/webp",
            title?: string,
            folder?: "menu" | "dishes" | "action" | "restaurants" | "partners",
        }>({
            query: (body) => ({
                url: "uploadImage",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: { title: string, image_url: string } }) => response.data,
        }),
        updateDish: builder.mutation<Dish, {
            uuid: string,
            name: string,
            weight: string,
            price: number,
            ingredients: string,
            sub_category_uuid: string,
            active: boolean,
            frozen: boolean,
            spicy: boolean,
            corporate_type?: string | null,
            wholesale_min_qty?: number | null,
            wholesale_price?: number | null,
            images: { title: string, image_url: string }[],
        }>({
            query: ({ uuid, ...body }) => ({
                url: `updateDish/${uuid}`,
                method: "PUT",
                body,
            }),
            transformResponse: (response: { data: Dish }) => response.data,
            invalidatesTags: (_result, _error, arg) => [
                { type: "Dish", id: arg.uuid },
                "MenuCategory",
            ],
        }),
        addDish: builder.mutation<Dish, {
            name: string,
            weight: string,
            price: number,
            frozen: boolean,
            spicy: boolean,
            ingredients: string,
            sub_category_uuid: string,
            active: boolean,
            corporate_type?: string | null,
            wholesale_min_qty?: number | null,
            wholesale_price?: number | null,
            images: { title: string, image_url: string }[],
        }>({
            query: (body) => ({
                url: "addDish",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: Dish }) => response.data,
            invalidatesTags: ["MenuCategory"],
        }),
        deleteDish: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `deleteDish/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MenuCategory"],
        }),
        addSubCategory: builder.mutation<SubCategory, { name: string, category_uuid: string }>({
            query: (body) => ({
                url: "subCategory",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: SubCategory }) => response.data,
            invalidatesTags: ["MenuCategory"],
        }),
        updateSubCategory: builder.mutation<SubCategory, { uuid: string, name: string }>({
            query: ({ uuid, name }) => ({
                url: `subCategory/${uuid}`,
                method: "PUT",
                body: { name },
            }),
            transformResponse: (response: { data: SubCategory }) => response.data,
            invalidatesTags: ["MenuCategory"],
        }),
        deleteSubCategory: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `subCategory/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MenuCategory"],
        }),
        updateCategory: builder.mutation<Categories, {
            uuid: string,
            title?: string,
            image_url?: string,
        }>({
            query: ({ uuid, ...body }) => ({
                url: `category/${uuid}`,
                method: "PUT",
                body,
            }),
            transformResponse: (response: { data: Categories }) => response.data,
            invalidatesTags: (_result, _error, arg) => [
                { type: "MenuCategory", id: arg.uuid },
                "MenuCategory",
            ],
        }),
        deleteCommentAdmin: builder.mutation<void, { commentUuid: string, dishUuid: string }>({
            query: ({ commentUuid }) => ({
                url: `admin/comment/${commentUuid}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: "Dish", id: arg.dishUuid }],
        }),
    }),
})

export const {
    useAllDishesQuery,
    useCategoriesQuery,
    useCategoryWithDishesQuery,
    useDishQuery,
    useAddCommentMutation,
    useUpdateDishMutation,
    useUploadDishImageMutation,
    useAddDishMutation,
    useDeleteDishMutation,
    useAddSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useDeleteCommentAdminMutation,
    useUpdateCategoryMutation,
} = dishesApi
