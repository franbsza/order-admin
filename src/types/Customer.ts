export interface CustomerDto{
    id: number;
    firstName: string;
    lastName: string;
    status: string;
    phone: string;
    email: string;
    address: AddressDto;
}

export interface AddressDto{
    id: number;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface CustomerParams{
    page?: number;
    perPage?: number;
    email?: String;
}

export interface CustomerResponse {
    meta: Meta;
    data: CustomerDto[];
}

export interface Meta{
    to: number;
    from: number;
    path: String;
    total: number;
    per_page: number;
    last_page: number;
    current_page: number;
}