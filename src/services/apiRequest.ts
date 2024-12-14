import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export type ApiResponse<T> = Promise<T>;
export type ApiError = AxiosError;

type ApiRequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface ApiRequestOptions<T> extends AxiosRequestConfig {
  method: ApiRequestMethod;
  data?: T;
}

export const apiRequest = async <T>(url: string, options: ApiRequestOptions<T>): ApiResponse<T> => {
  try {
    const { method, data, ...config } = options;

    const response = await axios({
      url,
      method,
      data,
      ...config,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error as ApiError;
    }
    throw new Error('An unexpected error occurred');
  }
};
