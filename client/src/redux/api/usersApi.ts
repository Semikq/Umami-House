import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getApiUrl from "../../utils/getApiUrl.ts";
import {transformAuthErrorResponse} from "../../utils/getAuthErrorMessage.ts";
import {BonusCard} from "../types/bonusCards.ts";
import {AdminUserListItem, UserRole} from "../types/adminUsers.ts";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['BonusCards', 'AdminUsers'],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/users"),
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
            }),
            transformErrorResponse: transformAuthErrorResponse,
        }),
        register: builder.mutation({
            query: ({ ...body }) => ({
                url: 'register',
                method: 'POST',
                body
            }),
            transformErrorResponse: transformAuthErrorResponse,
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
        }),
        updateUser: builder.mutation({
            query: ({ uuid, ...body }) => ({
                url: `updateUser/${uuid}`,
                method: 'PUT',
                body
            })
        }),
        updateUserCity: builder.mutation({
            query: ({ uuid, city_uuid }) => ({
                url: `updateCity/${uuid}`,
                method: 'PUT',
                body: { city_uuid },
            }),
        }),
        getBonusCardsByUser: builder.query<BonusCard[], string>({
            query: (uuid) => `bonusCards/${uuid}`,
            transformResponse: (response: { data: BonusCard[] }) => response.data,
            providesTags: (_result, _error, uuid) => [
                { type: 'BonusCards', id: uuid },
                { type: 'BonusCards', id: `${uuid}-active` },
            ],
        }),
        addBonusCard: builder.mutation<BonusCard, {
            userUuid: string,
            name: string,
            amount: number,
            description: string,
            active_until: string,
        }>({
            query: ({ userUuid, ...body }) => ({
                url: `bonusCards/${userUuid}`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: { data: BonusCard }) => response.data,
            invalidatesTags: (_result, _error, arg) => [
                { type: 'BonusCards', id: arg.userUuid },
                { type: 'BonusCards', id: `${arg.userUuid}-active` },
            ],
        }),
        deleteBonusCard: builder.mutation<void, string>({
            query: (cardUuid) => ({
                url: `bonusCards/card/${cardUuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['BonusCards'],
        }),
        getActiveBonusCardsByUser: builder.query<BonusCard[], string>({
            query: (uuid) => `bonusCards/${uuid}/active`,
            transformResponse: (response: { data: BonusCard[] }) => response.data,
            providesTags: (_result, _error, uuid) => [
                { type: 'BonusCards', id: `${uuid}-active` },
            ],
        }),
        getAllUsers: builder.query<AdminUserListItem[], void>({
            query: () => 'all',
            transformResponse: (response: { data: AdminUserListItem[] }) => response.data,
            providesTags: ['AdminUsers'],
        }),
        updateUserRole: builder.mutation<AdminUserListItem, { uuid: string, role: UserRole }>({
            query: ({ uuid, role }) => ({
                url: `role/${uuid}`,
                method: 'PUT',
                body: { role },
            }),
            transformResponse: (response: { data: AdminUserListItem }) => response.data,
            invalidatesTags: ['AdminUsers'],
        }),
        deleteUserByAdmin: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `delete/${uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AdminUsers'],
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyRefreshQuery,
    useLogoutMutation,
    useUpdateUserMutation,
    useUpdateUserCityMutation,
    useGetBonusCardsByUserQuery,
    useGetActiveBonusCardsByUserQuery,
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useAddBonusCardMutation,
    useDeleteBonusCardMutation,
    useDeleteUserByAdminMutation,
} = usersApi