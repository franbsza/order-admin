import { Technician, TechnicianParams, TechnicianResponse } from '../../types/Technician';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = "/technicians";

function getTechnicians({page=0, perPage=10, email=""}){
    const params = {page: page, perPage: perPage}; 
    return `${endpointUrl}?${parseQueryParams(params)}`
}

function getTechnicianById({ id }: { id: number }) {
    return `${endpointUrl}/${id}`;
}

function parseQueryParams(params: TechnicianParams){
    const query = new URLSearchParams();

    if(params.page){
        query.append("page", params.page.toString());
    }
    if(params.perPage){
        query.append("per_page", params.perPage.toString());
    }
    return query.toString();
}

function cancelTechnicianMutation({ id }: { id: string}) {
    return {
      url: `${endpointUrl}/${id}`,
      method: "DELETE",
    };
}

export const techniciansApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getTechnicians: query<TechnicianResponse, TechnicianParams>({
            query: getTechnicians,
            providesTags: ["Technicians"]
        }),
        getTechnicianById: query<Technician, { id: number }>({
            query: getTechnicianById,
            providesTags: ["Technicians"],
        })
    }),
}); 

export const {
    useGetTechniciansQuery,
    useGetTechnicianByIdQuery,
} = techniciansApiSlice