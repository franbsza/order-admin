export interface Vehicle{
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

  export interface VehicleResponse {
    meta: Meta;
    data: Vehicle[];
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