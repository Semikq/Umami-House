import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Partners} from "../types/partners.ts";

export const partnersApi = createApi({
    reducerPath: "partnersApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/partners` }),
    endpoints: (builder) => ({
        partners: builder.query<Partners[], void>({ query: () => "" })
    })
})

export const { usePartnersQuery } = partnersApi