import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Partners} from "../types/partners.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const partnersApi = createApi({
    reducerPath: "partnersApi",
    tagTypes: ["Partners"],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/partners"),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        partners: builder.query<Partners[], void>({
            query: () => "/all",
            providesTags: ["Partners"],
        }),
        addPartner: builder.mutation<Partners, {
            name: string,
            logo_img: string,
            link_website?: string,
            active: boolean,
        }>({
            query: (body) => ({
                url: "addPartners",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: Partners }) => response.data,
            invalidatesTags: ["Partners"],
        }),
        updatePartner: builder.mutation<Partners, {
            uuid: string,
            name: string,
            logo_img: string,
            link_website?: string,
            active: boolean,
        }>({
            query: ({ uuid, ...body }) => ({
                url: `updatePartners/${uuid}`,
                method: "PUT",
                body,
            }),
            transformResponse: (response: { data: Partners }) => response.data,
            invalidatesTags: ["Partners"],
        }),
        deletePartner: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `deletePartners/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Partners"],
        }),
        uploadPartnerLogo: builder.mutation<{ logo_img: string, title: string }, {
            data: string,
            mimeType: "image/jpeg" | "image/png" | "image/webp",
            title?: string,
        }>({
            query: (body) => ({
                url: "uploadImage",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: { logo_img: string, title: string } }) => response.data,
        }),
    }),
});

export const {
    usePartnersQuery,
    useAddPartnerMutation,
    useUpdatePartnerMutation,
    useDeletePartnerMutation,
    useUploadPartnerLogoMutation,
} = partnersApi;
