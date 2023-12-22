export interface Order {
  id: number;
  service: Service;
  address: Address;
  vehicle: Vehicle;
  orderStatus: null | String;
  slot: Slot;
  description: null | String;
}

export interface Order {
  service: Service;
  address: Address;
  vehicle: Vehicle;
  period: String;
  dateTime: Date;
}

export interface OrderDto {
  id: number;
  serviceId: number;
  serviceName: String;
  address: Address;
  vehicle: Vehicle;
  orderStatus: null | String;
  period: String;
  dateTime: Date;
  description: null | String;
  expertTechnicianName: String;
  email: String;
}

export interface OrderRequest {
  id: string;
  serviceId: number;
  address: Address
  vehicle: Vehicle;
  orderStatus: null | String;
  period: String;
  dateTime: Date;
  description: null | String;
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

  export interface OrderResponse {
    meta: Meta;
    data: OrderDto[];
  }
  
  export interface Service {
    id: number;
    name: String;
  }

  export interface Address {
    id: number;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  }

  export interface Vehicle {
    id: number;
    name: String;
    isActive: boolean;
    brand: string;
    model: string;
    year: string;
    plateNumber: string;
    color: string;
    renavam: string;
    isProtected: boolean;
  }
  
  export interface Slot {
    period: String;
    dateTime: Date;
  }

  export interface OrderParams {
    page?: number;
    perPage?: number;
    email?: String;
  }