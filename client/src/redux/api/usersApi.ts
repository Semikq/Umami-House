import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/users',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as any).auth.token
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        },
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ ...body }) => ({
                url: 'login',
                method: 'POST',
                body
            })
        }),
        register: builder.mutation({
            query: ({ ...body }) => ({
                url: 'register',
                method: 'POST',
                body
            })
        }),
    })
})

export const { useLoginMutation, useRegisterMutation } = usersApi