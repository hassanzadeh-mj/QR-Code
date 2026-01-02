import { axiosInstance } from '@/shared/api/axios-instance';
import { LOGIN_ENDPOINTS } from './endpoints';
import type { LoginData, LoginResponse } from '../../types';

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    LOGIN_ENDPOINTS.login,
    data
  );
  return response.data;
};

