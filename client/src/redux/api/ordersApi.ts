import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/orders` }),
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