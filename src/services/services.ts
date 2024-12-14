import { apiRequest, ApiResponse } from './apiRequest';
import { Customer, CustomerServicesCount, OngoingService, Service } from '../types/services/types';

export const getServicesRequest = (): ApiResponse<Service[]> => {
  return apiRequest<Service[]>('https://2328-136-158-61-91.ngrok-free.app/services', {
    method: 'get',
  });
};

export const getCustomersRequest = (): ApiResponse<Customer[]> => {
  return apiRequest<Customer[]>('https://2328-136-158-61-91.ngrok-free.app/customers', {
    method: 'get',
  });
};

export const getCustomerServicesCountRequest = (id: string): ApiResponse<CustomerServicesCount> => {
  return apiRequest<CustomerServicesCount>(
    `https://2328-136-158-61-91.ngrok-free.app/customers/${id}`,
    {
      method: 'get',
    },
  );
};

export const getOngoingServicesRequest = (): ApiResponse<OngoingService[]> => {
  return apiRequest<OngoingService[]>('https://2328-136-158-61-91.ngrok-free.app/ongoing', {
    method: 'get',
  });
};

export const postOngoingServiceRequest = (data: OngoingService): ApiResponse<any> => {
  return apiRequest<any>('https://2328-136-158-61-91.ngrok-free.app/ongoing', {
    method: 'post',
    data: data,
  });
};
