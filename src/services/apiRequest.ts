/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from 'axios';

// Types for API responses and errors
export type ApiResponse<T> = Promise<{
  success: boolean;
  status: number;
  data?: T;
  error?: string;
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
): Promise<{ success: boolean; status: number; data?: Res; error?: string }> => {
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

      // Return the error as part of the response
      return {
        success: false,
        status,
        error: message,
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
