import Config from 'react-native-config';

import { apiRequest, ApiResponse } from './apiRequest';
import {
  CustomerInformationResponse,
  CustomersResponse,
  EmployeeInformationResponse,
  EmployeesResponse,
  LoginPayload,
  LoginResponse,
  ServicesResponse,
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
