import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/orders" }),
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: ({...body}) => ({
                url: `addOrder`,
                method: 'POST',
                body
            })
        })
    })
})

export const { useAddOrderMutation } = ordersApi