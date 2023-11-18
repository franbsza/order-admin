import { apiSlice } from '../api/apiSlice';
import { Order, OrderParams, OrderRequest, OrderResponse } from '../../types/Order';

const endpointUrl = "/orders";

function createOrderMutation(orderRequest: OrderRequest) {
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: orderRequest 
    };
  }

  function parseQueryParams(params: OrderParams){
    const query = new URLSearchParams();

    if(params.page){
        query.append("page", params.page.toString());
    }
    if(params.perPage){
        query.append("per_page", params.perPage.toString());
    }
    if(params.email){
        query.append("email", params.email.toString());
    }
    return query.toString();
}

function getOrders({page=0, perPage=10, email=""}){
    const params = {page: page, perPage: perPage, email: email}; 
    return `${endpointUrl}?${parseQueryParams(params)}`
}

function getOrderById({ id }: { id: string}) {
    return `${endpointUrl}/${id}`;
}

function getOrderByUser({email} : { email: string }) {
    return `${endpointUrl}/email/${email}`;
}

function updateOrderMutation(order: OrderRequest) {
    return {
      url: `${endpointUrl}/${order.id}`,
      method: "PUT",
      body: order,
    };
  }

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createOrder: mutation<OrderResponse, OrderRequest>({
            query: createOrderMutation,
            invalidatesTags: ["Orders"]
        }),
        getOrderById: query<OrderRequest, {id: string}>({
            query: getOrderById,
            providesTags: ["Orders"]
        }),
        getOrderByUser: query<OrderResponse, {email: string}>({
            query: getOrderByUser,
            providesTags: ["Orders"]
        }),
        getOrders: query<OrderResponse, OrderParams>({
            query: getOrders,
            providesTags: ["Orders"]
        }),
        updateOrder: mutation<Order, OrderRequest>({
            query: updateOrderMutation,
            invalidatesTags: ["Orders"],
        }),
    })
}); 

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderMutation,
    useGetOrderByUserQuery,
} = ordersApiSlice