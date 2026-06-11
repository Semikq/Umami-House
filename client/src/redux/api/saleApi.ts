import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Sale} from "../types/sale.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const saleApi = createApi({
    reducerPath: "saleApi",
    tagTypes: ["Sale"],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/sales"),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        sale: builder.query<Sale[], void>({
            query: () => "/all",
            providesTags: ["Sale"],
        }),
        addSale: builder.mutation<Sale, { title: string, image_url: string, active: boolean }>({
            query: (body) => ({
                url: "addSale",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: Sale }) => response.data,
            invalidatesTags: ["Sale"],
        }),
        updateSale: builder.mutation<Sale, {
            uuid: string,
            title: string,
            image_url: string,
            active: boolean,
        }>({
            query: ({ uuid, ...body }) => ({
                url: `updateSale/${uuid}`,
                method: "PUT",
                body,
            }),
            transformResponse: (response: { data: Sale }) => response.data,
            invalidatesTags: ["Sale"],
        }),
        deleteSale: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `deleteSale/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sale"],
        }),
        uploadSaleImage: builder.mutation<{ image_url: string, title: string }, {
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
    useSaleQuery,
    useAddSaleMutation,
    useUpdateSaleMutation,
    useDeleteSaleMutation,
    useUploadSaleImageMutation,
} = saleApi;
