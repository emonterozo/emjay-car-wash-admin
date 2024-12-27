import Config from 'react-native-config';

import { apiRequest, ApiResponse } from './apiRequest';
import { LoginPayload, LoginResponse } from '../types/services/types';

export const loginRequest = (payload: LoginPayload): ApiResponse<LoginResponse> => {
  return apiRequest<LoginPayload, LoginResponse>(`${Config.API_BASE_URL}/admin/logins`, {
    method: 'post',
    data: payload,
  });
};
