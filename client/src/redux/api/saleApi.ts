import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Sale} from "../types/sale.ts";

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/sales` }),
    endpoints: (builder) => ({
        sale: builder.query<Sale[], void>({ query: () => "/all" })
    })
})

export const {useSaleQuery} = saleApi