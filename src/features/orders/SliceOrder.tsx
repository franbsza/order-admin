import { apiSlice } from '../api/apiSlice';
import { OrderDto, OrderParams, OrderResponse } from '../../types/Order';

const endpointUrl = "/orders";

function createOrderMutation(orderRequest: OrderDto) {
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

function updateOrderMutation(order: OrderDto) {
    return {
      url: `${endpointUrl}/${order.id}`,
      method: "PUT",
      body: order,
    };
  }

  function cancelOrderMutation({ id }: { id: string}) {
    return {
      url: `${endpointUrl}/${id}`,
      method: "DELETE",
    };
}

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createOrder: mutation<OrderResponse, OrderDto>({
            query: createOrderMutation,
            invalidatesTags: ["Orders"]
        }),
        getOrderById: query<OrderDto, {id: string}>({
            query: getOrderById,
            providesTags: ["Orders"]
        }),
        getOrders: query<OrderResponse, OrderParams>({
            query: getOrders,
            providesTags: ["Orders"]
        }),
        updateOrder: mutation<OrderResponse, OrderDto>({
            query: updateOrderMutation,
            invalidatesTags: ["Orders"],
        }),
        cancelOrder: mutation<OrderResponse, {id: String}>({
            query: cancelOrderMutation,
            invalidatesTags: ["Orders"]
        }),
    })
}); 

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderMutation,
    useCancelOrderMutation
} = ordersApiSlice