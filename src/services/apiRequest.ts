/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { ErrorProps } from '../types/services/types';

// Types for API responses and errors
export type ApiResponse<T> = Promise<{
  success: boolean;
  status: number;
  data?: T;
  error?: string;
  errors?: ErrorProps[];
}>;

type ApiRequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// eslint-disable-next-line no-unused-vars
interface ApiRequestOptions<Req, Res> extends AxiosRequestConfig {
  method: ApiRequestMethod;
  data?: Req;
}

export const apiRequest = async <Req, Res>(
  url: string,
  options: ApiRequestOptions<Req, Res>,
  token?: string,
  retry = true,
): Promise<{
  success: boolean;
  status: number;
  data?: Res;
  error?: string;
  errors?: ErrorProps[];
}> => {
  try {
    const { method, data, ...config } = options;

    const response = await axios({
      url,
      method,
      data,
      ...config,
    });

    return {
      success: true,
      status: response.status,
      ...(response.data as Res),
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const message = error.response?.data?.message || error.message || 'An error occurred';

      if (status === 403 && retry && token) {
        try {
          const newToken = await refreshToken(token);

          return apiRequest(
            url,
            {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${newToken}`,
              },
            },
            token,
            false,
          );
        } catch (refreshError) {
          return {
            success: false,
            status: 401,
            error: 'Session expired. Please log in again.',
          };
        }
      }

      // Return the error as part of the response
      return {
        success: false,
        status,
        error: message,
        errors: error.response?.data?.errors || [],
      };
    }

    // Handle unexpected errors
    return {
      success: false,
      status: 0,
      error: 'An unexpected error occurred',
    };
  }
};

const refreshToken = async (token: string): Promise<void> => {
  const response = await axios.post(`${Config.API_BASE_URL}/customers/refresh/token`, {
    refresh_token: token,
  });
  return response.data.data.accessToken;
};
