import { apiSlice } from '../api/apiSlice';
import { Order, OrderRequest, OrderResponse } from '../../types/Order';

const endpointUrl = "/orders";

function createOrderMutation(orderRequest: OrderRequest) {
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: orderRequest 
    };
  }

function getOrders(){
    return `${endpointUrl}`
}

function getOrderById({ id }: { id: number}) {
    return `${endpointUrl}/${id}`;
}

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createOrder: mutation<OrderResponse, OrderRequest>({
            query: createOrderMutation,
            invalidatesTags: ["Orders"]
        }),
        getOrderById: query<Order, {id: number}>({
            query: getOrderById,
            providesTags: ["Orders"]
        }),
        getOrders: query<OrderResponse, void>({
            query: getOrders,
            providesTags: ["Orders"]
        }),

    })
}); 

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery
} = ordersApiSlice