import { ERROR_TYPE } from '@app/constant';

export type TransactionStatusType = 'ONGOING' | 'COMPLETED' | 'CANCELLED';
export type TransactionServiceStatusType = 'PENDING' | 'ONGOING' | 'DONE' | 'CANCELLED';

export type EmployeeStatusType = 'ACTIVE' | 'TERMINATED';
export type GenderType = 'MALE' | 'FEMALE';
export type VehicleType = 'car' | 'motorcycle';
export type ServiceChargeType = 'free' | 'not free';

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
  type: VEHICLE_TYPE;
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
  gender: GENDER;
  employee_title: string;
  employee_status: EMPLOYEE_STATUS;
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
  gender: GENDER;
  birth_date: string;
  contact_number: string;
  employee_title: string;
  employee_status: EMPLOYEE_STATUS;
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
  employee_status: EMPLOYEE_STATUS;
  date_started: string | undefined;
};

export type AddEmployeeResponse = {
  employee: {
    id: string;
  };
  errors: ErrorProps[];
};

export type UpdateEmployeePayload = {
  contact_number: string;
  employee_title: string;
  employee_status: EMPLOYEE_STATUS;
};

export type UpdateEmployeeResponse = {
  employee: {
    id: string;
  };
  errors: ErrorProps[];
};

export type OngoingTransaction = {
  id: string;
  model: string;
  plate_number: string;
  check_in: string;
  customer_id: string | null;
  first_name: string;
  last_name: string;
  status: TRANSACTION_STATUS;
};

export type OngoingTransactionResponse = {
  transactions: OngoingTransaction[];
  totalCount: number;
  errors: ErrorProps[];
};

export type TransactionServices = {
  transaction_service_id: string;
  service_id: string;
  title: string;
  image: string;
  price: number;
  status: TRANSACTION_SERVICE_STATUS;
  is_free: boolean;
};

export type TransactionServicesResponse = {
  transaction: {
    id: string;
    contact_number: string | null;
    vehicle_type: string;
    vehicle_size: string;
    model: string;
    plate_number: string;
    availed_services: TransactionServices[];
  };
  errors: ErrorProps[];
};

export type TransactionServiceEmployee = {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
};

export type TransactionServiceDetailsResponse = {
  transaction: {
    id: string;
    transaction_service_id: string;
    image: string;
    title: string;
    price: number;
    deduction: number;
    discount: number;
    company_earnings: number;
    employee_share: number;
    status: TRANSACTION_SERVICE_STATUS;
    is_free: boolean;
    is_paid: boolean;
    start_date: string | null;
    end_date: string | null;
    assigned_employees: TransactionServiceEmployee[];
  };
  errors: ErrorProps[];
};

export type CustomerFreeWashServiceResponse = {
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    free_wash: { size: string; count: number; vehicle_type: string }[];
  };
  errors: ErrorProps[];
};

export type AddTransactionServicePayload = {
  service_id: string;
  price: number;
  service_charge: SERVICE_CHARGE;
};

export type AddTransactionServiceResponse = {
  transaction_service: {
    id: string;
  };
  errors: ErrorProps[];
};

export type CreateOngoingTransactionPayload = {
  customer_id?: string;
  vehicle_type: VEHICLE_TYPE;
  vehicle_size: string;
  model: string;
  plate_number: string;
  contact_number?: string;
  service_id: string;
  price: number;
  service_charge: SERVICE_CHARGE;
};

export type CreateOngoingTransactionResponse = {
  ongoing: {
    id: string;
  };
  errors: ErrorProps[];
};

export type UpdateAvailedServicePayload = {
  discount: number;
  deduction: number;
  is_free: boolean;
  is_paid: boolean;
  status: string;
  assigned_employee?: string;
};

export type UpdateAvailedServiceResponse = {
  transaction_service: {
    id: string;
  };
  errors: ErrorProps[];
};

export type TransactionItem = {
  id: string;
  transaction_id: string;
  service_name: string;
  price: number;
  date: string;
};

export type TransactionSummary = {
  gross_income: number;
  company_earnings: number;
  employee_share: number;
  deduction: number;
  discount: number;
};

export type TransactionResponse = {
  summary: TransactionSummary;
  transactions: TransactionItem[];
  errors: ErrorProps[];
};

export type TransactionDetailsResponse = {
  transaction: Omit<
    TransactionServiceDetailsResponse['transaction'],
    'image' | 'status' | 'is_free' | 'is_paid'
  > & {
    first_name: string;
    last_name: string;
    vehicle_type: VehicleType;
    model: string;
    vehicle_size: string;
    plate_number: string;
  };
  errors: ErrorProps[];
};

export type UpdateTransactionResponse = {
  transaction: {
    id: string;
  };
  errors: ErrorProps[];
};
