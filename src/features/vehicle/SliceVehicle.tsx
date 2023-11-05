import { Vehicle, VehicleResponse } from '../../types/Vehicle';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = "/vehicles";

function getVehicles(){
    return `${endpointUrl}`;
}

function getVehicleById({ id }: { id: number }) {
    return `${endpointUrl}/${id}`;
}

export const vehiclesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getVehicles: query<VehicleResponse, void>({
            query: getVehicles,
            providesTags: ["Vehicles"]
        }),
        getVehicle: query<Vehicle, { id: number }>({
            query: getVehicleById,
            providesTags: ["Vehicles"],
        })
    }),
}); 

export const {
    useGetVehicleQuery,
    useGetVehiclesQuery
} = vehiclesApiSlice