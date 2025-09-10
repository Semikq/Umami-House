import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Sale} from "../types/sale.ts";

export const saleApi = createApi({
    reducerPath: `${process.env.REACT_APP_API_URL}saleApi`,
    baseQuery: fetchBaseQuery({ baseUrl: "sales" }),
    endpoints: (builder) => ({
        sale: builder.query<Sale[], void>({ query: () => "" })
    })
})

export const {useSaleQuery} = saleApi