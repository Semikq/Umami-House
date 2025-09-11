import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getApiUrl from "../../utils/getApiUrl.ts";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: getApiUrl("/orders") }),
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