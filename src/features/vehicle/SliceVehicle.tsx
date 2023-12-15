import { Vehicle, VehicleDto, VehicleParams, VehicleResponse } from '../../types/Vehicle';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = "/vehicles";

function getVehicles({page=0, perPage=10, email=""}){
    const params = {page: page, perPage: perPage, email: email}; 
    return `${endpointUrl}?${parseQueryParams(params)}`
}

function getVehicleById({ id }: { id: number }) {
    return `${endpointUrl}/${id}`;
}

function parseQueryParams(params: VehicleParams){
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

function createVehicleMutation(vehicleRequest: VehicleDto) {
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: vehicleRequest 
    };
  }


function updateVehicleMutation(vehicle: VehicleDto) {
    return {
      url: `${endpointUrl}/${vehicle.id}`,
      method: "PUT",
      body: vehicle,
    };
  }

function cancelVehicleMutation({ id }: { id: string}) {
    return {
      url: `${endpointUrl}/${id}`,
      method: "DELETE",
    };
}

export const vehiclesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getVehicles: query<VehicleResponse, VehicleParams>({
            query: getVehicles,
            providesTags: ["Vehicles"]
        }),
        getVehicle: query<Vehicle, { id: number }>({
            query: getVehicleById,
            providesTags: ["Vehicles"],
        }),
        createVehicle: mutation<VehicleResponse, VehicleDto>({
            query: createVehicleMutation,
            invalidatesTags: ["Vehicles"]
        }),
        updateVehicle: mutation<VehicleResponse, VehicleDto>({
            query: updateVehicleMutation,
            invalidatesTags: ["Vehicles"],
        }),
        cancelVehicle: mutation<VehicleResponse, {id: String}>({
            query: cancelVehicleMutation,
            invalidatesTags: ["Vehicles"]
        }),
    }),
}); 

export const {
    useGetVehicleQuery,
    useGetVehiclesQuery,
    useCreateVehicleMutation,
    useUpdateVehicleMutation,
    useCancelVehicleMutation
} = vehiclesApiSlice