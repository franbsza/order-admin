import { CustomerDto, CustomerParams, CustomerResponse } from '../../types/Customer';
import { apiSlice } from '../api/apiSlice';


const endpointUrl = "/customers";

function createCustomerMutation(customerRequest: CustomerDto) {
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: customerRequest 
    };
  }

  function parseQueryParams(params: CustomerParams){
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

function getCustomers({page=0, perPage=10, email=""}){
    const params = {page: page, perPage: perPage, email: email}; 
    return `${endpointUrl}?${parseQueryParams(params)}`
}

function getCustomerById({ email }: { email: string}) {
    return `${endpointUrl}/email/${email}`;
}

function updateCustomerMutation(customer: CustomerDto) {
    return {
      url: `${endpointUrl}/${customer.id}`,
      method: "PUT",
      body: customer,
    };
  }

  function cancelCustomerMutation({ id }: { id: string}) {
    return {
      url: `${endpointUrl}/${id}`,
      method: "DELETE",
    };
}

export const CustomersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createCustomer: mutation<CustomerResponse, CustomerDto>({
            query: createCustomerMutation,
            invalidatesTags: ["Customers"]
        }),
        getCustomerById: query<CustomerDto, {email: string}>({
            query: getCustomerById,
            providesTags: ["Customers"]
        }),
        getCustomers: query<CustomerResponse, CustomerParams>({
            query: getCustomers,
            providesTags: ["Customers"]
        }),
        updateCustomer: mutation<CustomerResponse, CustomerDto>({
            query: updateCustomerMutation,
            invalidatesTags: ["Customers"],
        }),
        cancelCustomer: mutation<CustomerResponse, {id: String}>({
            query: cancelCustomerMutation,
            invalidatesTags: ["Customers"]
        }),
    })
}); 

export const {
    useCreateCustomerMutation,
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation,
    useCancelCustomerMutation
} = CustomersApiSlice