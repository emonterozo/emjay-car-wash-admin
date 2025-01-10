export type ErrorProps = {
  field: string;
  message: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    token: string;
    user: {
      id: string;
      type: string;
      username: string;
    };
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
  data: {
    services: Service[];
  };
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
  data: {
    customers: Customer[];
    total: number;
  };
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
  car_services_count: ServiceCount[];
  moto_services_count: ServiceCount[];
};

export type CustomerInformationResponse = {
  data: {
    customer_services: CustomerInformation;
  };
  errors: ErrorProps[];
};
