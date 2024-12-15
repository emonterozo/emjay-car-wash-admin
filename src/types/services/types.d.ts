export type ServicePrice = {
  category: string;
  price: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  type: string;
  price_list: ServicePrice[];
};

export type ServiceCount = {
  size: string;
  count: number;
};

export type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  date_added: string;
};

export type CustomerServicesCount = {
  id: string;
  first_name: string;
  last_name: string;
  motor_services_count: ServiceCount[];
  car_services_count: ServiceCount[];
};

export type PreTransaction = {
  id: string;
  service_id: string;
  service: string;
  price: number;
  company_earnings: number;
  employee_share: number;
  is_done: boolean;
  is_free: boolean;
  completed_on: string;
  assigned_employee_id: string[];
  assigned_employee: string[];
};

export type OngoingService = {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  vehicle_type: string;
  vehicle_size: string;
  model: string;
  plate_number: string;
  contact_number: string;
  check_in: string;
  is_completed: false;
  pre_transaction: PreTransaction[];
};
