import Config from 'react-native-config';

import { apiRequest, ApiResponse } from './apiRequest';
import {
  AddEmployeePayload,
  AddEmployeeResponse,
  CustomerInformationResponse,
  CustomersResponse,
  EmployeeInformationResponse,
  EmployeesResponse,
  LoginPayload,
  LoginResponse,
  ServicesResponse,
  UpdateEmployeePayload,
  UpdateEmployeeResponse,
} from '../types/services/types';

const requestHeader = (accessToken: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};

export const loginRequest = (payload: LoginPayload): ApiResponse<LoginResponse> => {
  return apiRequest<LoginPayload, LoginResponse>(`${Config.API_BASE_URL}/admin/login`, {
    method: 'post',
    data: payload,
  });
};

export const getServicesRequest = (
  accessToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<ServicesResponse> => {
  return apiRequest<null, ServicesResponse>(`${Config.API_BASE_URL}/services`, {
    method: 'get',
    headers: requestHeader(accessToken),
    params: {
      order_by: JSON.stringify({ field: field ?? 'ratings', direction: direction ?? 'desc' }),
      limit,
      offset,
    },
  });
};

export const getCustomersRequest = (
  accessToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<CustomersResponse> => {
  return apiRequest<null, CustomersResponse>(`${Config.API_BASE_URL}/admin/customers`, {
    method: 'get',
    headers: requestHeader(accessToken),
    params: {
      order_by: JSON.stringify({ field: field ?? 'registered_on', direction: direction ?? 'desc' }),
      limit,
      offset,
    },
  });
};

export const getCustomerInformationRequest = (
  accessToken: string,
  id: string,
): ApiResponse<CustomerInformationResponse> => {
  return apiRequest<null, CustomerInformationResponse>(
    `${Config.API_BASE_URL}/admin/customers/${id}`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
  );
};

export const getEmployeesRequest = (
  accessToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<EmployeesResponse> => {
  return apiRequest<null, EmployeesResponse>(`${Config.API_BASE_URL}/admin/employees`, {
    method: 'get',
    headers: requestHeader(accessToken),
    params: {
      order_by: JSON.stringify({ field: field ?? 'last_name', direction: direction ?? 'desc' }),
      limit,
      offset,
    },
  });
};

export const getEmployeeInformationRequest = (
  accessToken: string,
  id: string,
): ApiResponse<EmployeeInformationResponse> => {
  return apiRequest<null, EmployeeInformationResponse>(
    `${Config.API_BASE_URL}/admin/employees/${id}`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
  );
};

export const addEmployeeRequest = (
  accessToken: string,
  first_name: string,
  last_name: string,
  birth_date: string | undefined,
  gender: string,
  contact_number: string,
  employee_title: string,
  employee_status: 'ACTIVE' | 'TERMINATED',
  date_started: string | undefined,
): ApiResponse<AddEmployeeResponse> => {
  return apiRequest<AddEmployeePayload, AddEmployeeResponse>(
    `${Config.API_BASE_URL}/admin/employees/add`,
    {
      method: 'post',
      headers: requestHeader(accessToken),
      data: {
        first_name,
        last_name,
        birth_date,
        gender,
        contact_number,
        employee_title,
        employee_status,
        date_started,
      },
    },
  );
};

export const updateEmployeeRequest = (
  id: string,
  accessToken: string,
  contact_number: string,
  employee_title: string,
  employee_status: 'ACTIVE' | 'TERMINATED',
): ApiResponse<UpdateEmployeeResponse> => {
  return apiRequest<UpdateEmployeePayload, UpdateEmployeeResponse>(
    `${Config.API_BASE_URL}/admin/employees/update/${id}`,
    {
      method: 'put',
      headers: requestHeader(accessToken),
      data: {
        contact_number,
        employee_title,
        employee_status,
      },
    },
  );
};
