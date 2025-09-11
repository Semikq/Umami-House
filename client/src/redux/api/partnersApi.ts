import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Partners} from "../types/partners.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const partnersApi = createApi({
    reducerPath: "partnersApi",
    baseQuery: fetchBaseQuery({ baseUrl: getApiUrl("/partners") }),
    endpoints: (builder) => ({
        partners: builder.query<Partners[], void>({ query: () => "/all" })
    })
})

export const { usePartnersQuery } = partnersApi