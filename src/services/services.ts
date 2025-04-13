import Config from 'react-native-config';

import { apiRequest, ApiResponse } from './apiRequest';
import {
  AddEmployeePayload,
  AddEmployeeResponse,
  AddTransactionServicePayload,
  AddTransactionServiceResponse,
  CreateOngoingTransactionPayload,
  CreateOngoingTransactionResponse,
  CustomerInformationResponse,
  CustomersResponse,
  CustomerFreeWashServiceResponse,
  EmployeeStatusType,
  EmployeeInformationResponse,
  EmployeesResponse,
  LoginPayload,
  LoginResponse,
  OngoingTransactionResponse,
  ServicesResponse,
  TransactionStatusType,
  TransactionServiceDetailsResponse,
  TransactionServicesResponse,
  UpdateEmployeePayload,
  UpdateEmployeeResponse,
  UpdateAvailedServiceResponse,
  UpdateAvailedServicePayload,
  TransactionResponse,
  TransactionDetailsResponse,
  UpdateTransactionResponse,
  AddConsumablesPayload,
  AddConsumablesResponse,
  WeeklySalesResponse,
  GetConsumablesResponse,
  DeleteConsumablesResponse,
  GetExpenseResponse,
  SalesStatisticsResponse,
  StatisticsFilter,
  AddExpenseResponse,
  AddExpensePayload,
  GetPromoResponse,
  AddPromoPayload,
  AddPromoResponse,
} from '../types/services/types';

const requestHeader = (accessToken: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};

export const loginRequest = (payload: LoginPayload): ApiResponse<LoginResponse> => {
  return apiRequest<LoginPayload, LoginResponse>(`${Config.API_BASE_URL}/accounts/login`, {
    method: 'post',
    data: payload,
  });
};

export const getServicesRequest = (
  accessToken: string,
  refreshToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<ServicesResponse> => {
  return apiRequest<null, ServicesResponse>(
    `${Config.API_BASE_URL}/services`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        order_by:
          field && direction
            ? JSON.stringify({ field: field ?? 'ratings', direction: direction ?? 'desc' })
            : undefined,
        limit,
        offset,
      },
    },
    refreshToken,
  );
};

export const getCustomersRequest = (
  accessToken: string,
  refreshToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<CustomersResponse> => {
  return apiRequest<null, CustomersResponse>(
    `${Config.API_BASE_URL}/customers`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        order_by: JSON.stringify({
          field: field ?? 'registered_on',
          direction: direction ?? 'desc',
        }),
        limit,
        offset,
      },
    },
    refreshToken,
  );
};

export const getCustomerInformationRequest = (
  accessToken: string,
  refreshToken: string,
  id: string,
): ApiResponse<CustomerInformationResponse> => {
  return apiRequest<null, CustomerInformationResponse>(
    `${Config.API_BASE_URL}/customers/${id}`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const getEmployeesRequest = (
  accessToken: string,
  refreshToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<EmployeesResponse> => {
  return apiRequest<null, EmployeesResponse>(
    `${Config.API_BASE_URL}/employees`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        order_by: JSON.stringify({ field: field ?? 'date_started', direction: direction ?? 'asc' }),
        limit,
        offset,
      },
    },
    refreshToken,
  );
};

export const getEmployeeInformationRequest = (
  accessToken: string,
  refreshToken: string,
  id: string,
): ApiResponse<EmployeeInformationResponse> => {
  return apiRequest<null, EmployeeInformationResponse>(
    `${Config.API_BASE_URL}/employees/${id}`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const addEmployeeRequest = (
  accessToken: string,
  refreshToken: string,
  first_name: string,
  last_name: string,
  birth_date: string,
  gender: string,
  contact_number: string,
  employee_title: string,
  employee_status: EmployeeStatusType,
  date_started: string,
): ApiResponse<AddEmployeeResponse> => {
  return apiRequest<AddEmployeePayload, AddEmployeeResponse>(
    `${Config.API_BASE_URL}/employees`,
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
    refreshToken,
  );
};

export const updateEmployeeRequest = (
  id: string,
  accessToken: string,
  refreshToken: string,
  contact_number: string,
  employee_title: string,
  employee_status: EmployeeStatusType,
): ApiResponse<UpdateEmployeeResponse> => {
  return apiRequest<UpdateEmployeePayload, UpdateEmployeeResponse>(
    `${Config.API_BASE_URL}/employees/${id}`,
    {
      method: 'patch',
      headers: requestHeader(accessToken),
      data: {
        contact_number,
        employee_title,
        employee_status,
      },
    },
    refreshToken,
  );
};

export const getCustomerFreeWashServiceRequest = (
  accessToken: string,
  refreshToken: string,
  id: string,
): ApiResponse<CustomerFreeWashServiceResponse> => {
  return apiRequest<null, CustomerFreeWashServiceResponse>(
    `${Config.API_BASE_URL}/customers/${id}/free-wash-points`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const getOngoingTransactionsRequest = (
  accessToken: string,
  refreshToken: string,
  status: TransactionStatusType = 'ONGOING',
  dateRange?: {
    start: string;
    end: string;
  },
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<OngoingTransactionResponse> => {
  let params: any = {
    order_by: JSON.stringify({ field: field ?? 'check_in', direction: direction ?? 'asc' }),
    limit,
    offset,
    status,
  };

  if (dateRange) {
    params.date_range = JSON.stringify(dateRange);
  }

  return apiRequest<null, OngoingTransactionResponse>(
    `${Config.API_BASE_URL}/transactions`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: params,
    },
    refreshToken,
  );
};

export const getTransactionServicesRequest = (
  accessToken: string,
  refreshToken: string,
  id: string,
): ApiResponse<TransactionServicesResponse> => {
  return apiRequest<null, TransactionServicesResponse>(
    `${Config.API_BASE_URL}/transactions/${id}`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const getTransactionServiceDetailsRequest = (
  accessToken: string,
  refreshToken: string,
  transactionId: string,
  transactionServiceId: string,
): ApiResponse<TransactionServiceDetailsResponse> => {
  return apiRequest<null, TransactionServiceDetailsResponse>(
    `${Config.API_BASE_URL}/transactions/${transactionId}/availed-services/${transactionServiceId}`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const createOngoingTransactionRequest = (
  accessToken: string,
  refreshToken: string,
  payload: CreateOngoingTransactionPayload,
): ApiResponse<CreateOngoingTransactionResponse> => {
  return apiRequest<CreateOngoingTransactionPayload, CreateOngoingTransactionResponse>(
    `${Config.API_BASE_URL}/transactions`,
    {
      method: 'post',
      headers: requestHeader(accessToken),
      data: payload,
    },
    refreshToken,
  );
};

export const addTransactionServiceRequest = (
  accessToken: string,
  refreshToken: string,
  id: string,
  payload: AddTransactionServicePayload,
): ApiResponse<AddTransactionServiceResponse> => {
  return apiRequest<AddTransactionServicePayload, AddTransactionServiceResponse>(
    `${Config.API_BASE_URL}/transactions/${id}/availed-services`,
    {
      method: 'patch',
      headers: requestHeader(accessToken),
      data: payload,
    },
    refreshToken,
  );
};

export const updateAvailedServiceRequest = (
  transaction_id: string,
  transaction_service_id: string,
  accessToken: string,
  refreshToken: string,
  payload: UpdateAvailedServicePayload,
): ApiResponse<UpdateAvailedServiceResponse> => {
  return apiRequest<UpdateAvailedServicePayload, UpdateAvailedServiceResponse>(
    `${Config.API_BASE_URL}/transactions/${transaction_id}/availed-services/${transaction_service_id}`,
    {
      method: 'patch',
      headers: requestHeader(accessToken),
      data: payload,
    },
    refreshToken,
  );
};

export const getTransactionsRequest = (
  accessToken: string,
  refreshToken: string,
  dateRange: {
    start: string;
    end: string;
  },
  assignedEmployees?: string[],
): ApiResponse<TransactionResponse> => {
  return apiRequest<null, TransactionResponse>(
    `${Config.API_BASE_URL}/transactions/completed`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        date_range: JSON.stringify(dateRange),
        assigned_employees: assignedEmployees?.join(',') ?? undefined,
      },
    },
    refreshToken,
  );
};

export const getTransactionDetailsRequest = (
  accessToken: string,
  refreshToken: string,
  transactionId: string,
  transactionServiceId: string,
): ApiResponse<TransactionDetailsResponse> => {
  return apiRequest<null, TransactionDetailsResponse>(
    `${Config.API_BASE_URL}/transactions/details`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        transaction_id: transactionId,
        availed_service_id: transactionServiceId,
      },
    },
    refreshToken,
  );
};

export const updateTransactionRequest = (
  accessToken: string,
  refreshToken: string,
  transaction_id: string,
  status: 'CANCELLED' | 'COMPLETED',
): ApiResponse<UpdateTransactionResponse> => {
  return apiRequest<{ status: string }, UpdateTransactionResponse>(
    `${Config.API_BASE_URL}/transactions/${transaction_id}`,
    {
      method: 'patch',
      headers: requestHeader(accessToken),
      data: {
        status,
      },
    },
    refreshToken,
  );
};

export const addConsumablesRequest = (
  accessToken: string,
  refreshToken: string,
  payload: AddConsumablesPayload,
): ApiResponse<AddConsumablesResponse> => {
  return apiRequest<AddConsumablesPayload, AddConsumablesResponse>(
    `${Config.API_BASE_URL}/consumables`,
    {
      method: 'post',
      headers: requestHeader(accessToken),
      data: payload,
    },
    refreshToken,
  );
};

export const getWeeklySalesRequest = (
  accessToken: string,
  refreshToken: string,
  dateRange: {
    start: string;
    end: string;
  },
): ApiResponse<WeeklySalesResponse> => {
  return apiRequest<null, WeeklySalesResponse>(
    `${Config.API_BASE_URL}/transactions/week-sales`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        date_range: JSON.stringify(dateRange),
      },
    },
    refreshToken,
  );
};

export const getConsumableItemsRequest = (
  accessToken: string,
  refreshToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
): ApiResponse<GetConsumablesResponse> => {
  return apiRequest<null, GetConsumablesResponse>(
    `${Config.API_BASE_URL}/consumables`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        order_by: JSON.stringify({ field: field ?? 'name', direction: direction ?? 'asc' }),
        limit,
        offset,
      },
    },
    refreshToken,
  );
};

export const deleteConsumableItemRequest = (
  accessToken: string,
  refreshToken: string,
  id: string,
): ApiResponse<DeleteConsumablesResponse> => {
  return apiRequest<null, DeleteConsumablesResponse>(
    `${Config.API_BASE_URL}/consumables/${id}`,
    {
      method: 'delete',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const getSalesStatisticsRequest = (
  accessToken: string,
  refreshToken: string,
  filter: StatisticsFilter,
  end: string,
): ApiResponse<SalesStatisticsResponse> => {
  return apiRequest<null, SalesStatisticsResponse>(
    `${Config.API_BASE_URL}/transactions/statistics`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: {
        filter,
        end,
      },
    },
    refreshToken,
  );
};

export const addExpenseRequest = (
  accessToken: string,
  refreshToken: string,
  payload: AddExpensePayload,
): ApiResponse<AddExpenseResponse> => {
  return apiRequest<AddExpensePayload, AddExpenseResponse>(
    `${Config.API_BASE_URL}/expenses`,
    {
      method: 'post',
      headers: requestHeader(accessToken),
      data: payload,
    },
    refreshToken,
  );
};

export const getExpenseItemsRequest = (
  accessToken: string,
  refreshToken: string,
  field?: string,
  direction?: 'asc' | 'desc',
  limit?: number,
  offset?: number,
  dateRange?: {
    start: string;
    end: string;
  },
): ApiResponse<GetExpenseResponse> => {
  let params: any = {
    order_by: JSON.stringify({ field: field ?? 'date', direction: direction ?? 'desc' }),
    offset,
    limit,
  };

  if (dateRange) {
    params.date_range = JSON.stringify(dateRange);
  }
  return apiRequest<null, GetExpenseResponse>(
    `${Config.API_BASE_URL}/expenses`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
      params: params,
    },
    refreshToken,
  );
};

export const getPromos = (
  accessToken: string,
  refreshToken: string,
): ApiResponse<GetPromoResponse> => {
  return apiRequest<null, GetPromoResponse>(
    `${Config.API_BASE_URL}/promos`,
    {
      method: 'get',
      headers: requestHeader(accessToken),
    },
    refreshToken,
  );
};

export const addPromoRequest = (
  accessToken: string,
  refreshToken: string,
  is_active: boolean,
  title: string,
  description: string,
  percent: number,
): ApiResponse<AddPromoResponse> => {
  return apiRequest<AddPromoPayload, AddPromoResponse>(
    `${Config.API_BASE_URL}/promos`,
    {
      method: 'post',
      headers: requestHeader(accessToken),
      data: {
        is_active,
        title,
        description,
        percent,
      },
    },
    refreshToken,
  );
};

export const updatePromoRequest = (
  id: string,
  accessToken: string,
  refreshToken: string,
  is_active: boolean,
  title: string,
  description: string,
  percent: number,
): ApiResponse<AddPromoResponse> => {
  return apiRequest<AddPromoPayload, AddPromoResponse>(
    `${Config.API_BASE_URL}/promos/${id}`,
    {
      method: 'patch',
      headers: requestHeader(accessToken),
      data: {
        is_active,
        title,
        description,
        percent,
      },
    },
    refreshToken,
  );
};
