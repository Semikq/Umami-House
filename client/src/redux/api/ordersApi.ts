import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getApiUrl from "../../utils/getApiUrl.ts";
import {Order, OrderStatus} from "../types/orders.ts";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    tagTypes: ["Orders", "AdminOrders"],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl("/orders"),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getOrdersByUser: builder.query<Order[], string>({
            query: (uuid) => `user/${uuid}`,
            transformResponse: (response: { data: Order[] }) => response.data,
            providesTags: (_result, _error, uuid) => [{ type: "Orders", id: uuid }],
        }),
        getAllOrders: builder.query<Order[], string | undefined>({
            query: (status) => ({
                url: "all",
                params: status ? { status } : undefined,
            }),
            transformResponse: (response: { data: Order[] }) => response.data,
            providesTags: ["AdminOrders"],
        }),
        updateOrderStatus: builder.mutation<Order, { uuid: string, status: OrderStatus }>({
            query: ({ uuid, status }) => ({
                url: `status/${uuid}`,
                method: "PUT",
                body: { status },
            }),
            transformResponse: (response: { data: Order }) => response.data,
            invalidatesTags: ["AdminOrders"],
        }),
        deleteAdminOrder: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `deleteOrder/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AdminOrders"],
        }),
        addOrder: builder.mutation({
            query: ({ ...body }) => ({
                url: "addOrder",
                method: "POST",
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Orders", id: arg.user_uuid },
                "AdminOrders",
                { type: "BonusCards", id: arg.user_uuid },
                { type: "BonusCards", id: `${arg.user_uuid}-active` },
            ],
        }),
    }),
});

export const {
    useAddOrderMutation,
    useGetOrdersByUserQuery,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation,
    useDeleteAdminOrderMutation,
} = ordersApi;
