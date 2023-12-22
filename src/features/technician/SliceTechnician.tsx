import { TechnicianDto, TechnicianParams, TechnicianResponse } from '../../types/Technician';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = "/technicians";

function getTechnicians({page=0, perPage=10, email=""}){
    const params = {page: page, perPage: perPage}; 
    return `${endpointUrl}?${parseQueryParams(params)}`
}

function getTechnicianById({ id }: { id: string }) {
    return `${endpointUrl}/${id}`;
}

function createTechnicianMutation(request: TechnicianDto) {
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: request 
    };
  }

  function updateTechnicianMutation(technician: TechnicianDto) {
    return {
      url: `${endpointUrl}/${technician.id}`,
      method: "PUT",
      body: technician,
    };
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

export const techniciansApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getTechnicians: query<TechnicianResponse, TechnicianParams>({
            query: getTechnicians,
            providesTags: ["Technicians"]
        }),
        getTechnicianById: query<TechnicianDto, { id: string }>({
            query: getTechnicianById,
            providesTags: ["Technicians"],
        }),
        createTechnician: mutation<TechnicianResponse, TechnicianDto>({
            query: createTechnicianMutation,
            invalidatesTags: ["Technicians"]
        }),
        updateTechnician: mutation<TechnicianResponse, TechnicianDto>({
            query: updateTechnicianMutation,
            invalidatesTags: ["Technicians"],
        }),
    }),
}); 

export const {
    useGetTechniciansQuery,
    useGetTechnicianByIdQuery,
    useCreateTechnicianMutation,
    useUpdateTechnicianMutation
} = techniciansApiSlice