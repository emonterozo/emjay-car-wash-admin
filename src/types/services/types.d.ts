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

export type Employees = {
  first_name: string;
  last_name: string;
  gender: 'MALE' | 'FEMALE';
  employee_title: string;
  employee_status: 'ACTIVE' | 'TERMINATED';
  id: string;
};

export type EmployeesResponse = {
  employees: Employee[];
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

export type EmployeeInformation = {
  first_name: string;
  last_name: string;
  gender: 'MALE' | 'FEMALE';
  birth_date: string;
  contact_number: string;
  employee_title: string;
  employee_status: 'ACTIVE' | 'TERMINATED';
  date_started: string;
  id: string;
  recent_transactions: RecentTransaction[];
};

export type EmployeeInformationResponse = {
  employee: EmployeeInformation;
  errors: ErrorProps[];
};

export type AddEmployeePayload = {
  first_name: string;
  last_name: string;
  birth_date: string | undefined;
  gender: string;
  contact_number: string;
  employee_title: string;
  employee_status: 'ACTIVE' | 'TERMINATED';
  date_started: string | undefined;
};

export type AddEmployeeResponse = {
  data: {
    employee: {
      id: string;
    };
  };
  errors: ErrorProps[];
};

export type UpdateEmployeePayload = {
  contact_number: string;
  employee_title: string;
  employee_status: 'ACTIVE' | 'TERMINATED';
};

export type UpdateEmployeeResponse = {
  data: {
    employee: {
      id: string;
    };
  };
  errors: ErrorProps[];
};
