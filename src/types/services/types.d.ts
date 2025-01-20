import { ERROR_TYPE } from '@app/constant';

export type ScreenStatusProps = {
  isLoading: boolean;
  hasError: boolean;
  type: keyof typeof ERROR_TYPE;
};

export type ErrorProps = {
  field: string;
  message: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    type: string;
    username: string;
  };
  errors: ErrorProps[];
};

export type Price = {
  size: string;
  price: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'car' | 'motorcycle';
  ratings: number;
  reviews_count: number;
  last_review: string | null;
  price_list: Price[];
};

export type ServicesResponse = {
  services: Service[];
  errors: ErrorProps[];
};

export type Customer = {
  id: string;
  contact_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  registered_on: string;
};

export type CustomersResponse = {
  customers: Customer[];
  totalCount: number;
  errors: ErrorProps[];
};

export type ServiceCount = {
  size: string;
  count: number;
};

export type RecentTransaction = {
  id: string;
  service_name: string;
  price: number;
  date: string;
};

export type CustomerInformation = {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  address: string | null;
  barangay: string | null;
  city: string | null;
  province: string | null;
  birth_date: string;
  registered_on: string;
  recent_transactions: RecentTransaction[];
  car_wash_service_count: ServiceCount[];
  moto_wash_service_count: ServiceCount[];
};

export type CustomerInformationResponse = {
  customer: CustomerInformation;
  errors: ErrorProps[];
};
