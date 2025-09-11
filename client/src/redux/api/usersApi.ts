import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/users`,
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
        refresh: builder.query({
            query: () => ({
                url: 'refresh',
                method: 'POST',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLazyRefreshQuery, useLogoutMutation } = usersApi