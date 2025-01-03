import Config from 'react-native-config';

import { apiRequest, ApiResponse } from './apiRequest';
import { CustomersResponse, LoginPayload, LoginResponse, ServicesResponse } from '../types/services/types';

const requestHeader = (token: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const loginRequest = (payload: LoginPayload): ApiResponse<LoginResponse> => {
  return apiRequest<LoginPayload, LoginResponse>(`${Config.API_BASE_URL}/admin/login`, {
    method: 'post',
    data: payload,
  });
};

export const getServicesRequest = (
  token: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<ServicesResponse> => {
  return apiRequest<null, ServicesResponse>(`${Config.API_BASE_URL}/services`, {
    method: 'get',
    headers: requestHeader(token),
    params: {
      order_by: JSON.stringify({ field: field ?? 'ratings', direction: direction ?? 'desc' }),
      limit,
      offset,
    },
  });
};

export const getCustomersRequest = (
  token: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<CustomersResponse> => {
  return apiRequest<null, CustomersResponse>(`${Config.API_BASE_URL}/admin/customers`, {
    method: 'get',
    headers: requestHeader(token),
    params: {
      order_by: JSON.stringify({ field: field ?? 'registered_on', direction: direction ?? 'desc' }),
      limit,
      offset,
    },
  });
};


