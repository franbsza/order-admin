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
  serviceName: String;
  addressId: number
  neighborhood: String;
  street: String;
  number: String;
  city: String;
  state: String;
  zipCode: String;
  vehicleId: number;
  vehicleName: String;
  orderStatus: null | String;
  period: String;
  dateTime: Date;
  description: null | String;
  expertTechnicianName: String;
}

export interface OrderRequest {
  serviceId: number;
  addressId: number;
  vehicleId: number;
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
  }

  export interface Vehicle {
    id: number;
    name: String;
  }
  
  export interface Slot {
    period: String;
    dateTime: Date;
  }

  export interface OrderParams {
    page?: number;
    perPage?: number;
    search?: String;
    orderStatus?: String;
  }