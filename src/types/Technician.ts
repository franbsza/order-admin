export interface TechnicianDto{
    id: number;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    documentNumber: string;
    isPartner: boolean;
    personalAddress: PersonalAddress;
    }
  
    export interface TechnicianResponse {
      meta: Meta;
      data: TechnicianDto[];
    }
  
    export interface Meta {
      to: number;
      from: number;
      path: String;
      total: number;
      per_page: number;
      last_page: number;
      current_page: number;
    }
  
    export interface TechnicianParams {
      page?: number;
      perPage?: number;
    }

    export interface PersonalAddress{
        id: number;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        neighborhood: string;
        number: string;
        baseAddress: BaseAddress;
    }

    export interface BaseAddress{
      id: number;
      region: string;
    }

    export interface BaseAddressResponse {
      meta: Meta;
      data: BaseAddress[];
    }