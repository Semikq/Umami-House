import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Sale} from "../types/sale.ts";
import getApiUrl from "../../utils/getApiUrl.ts";

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: fetchBaseQuery({ baseUrl: getApiUrl("/sales") }),
    endpoints: (builder) => ({
        sale: builder.query<Sale[], void>({ query: () => "/all" })
    })
})

export const {useSaleQuery} = saleApi