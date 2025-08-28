import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/users' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ userInput, password }) => ({
                url: 'login',
                method: 'POST',
                body: { userInput, password }
            })
        }),
        register: builder.mutation({
            query: ({ email, password, name, surname, phone, company_type, company_name }) => ({
                url: 'register',
                method: 'POST',
                body: { email, password, name, surname, phone, company_type, company_name }
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = api