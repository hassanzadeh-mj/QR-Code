import { axiosInstance } from '@/shared/api/axios-instance';
import { SIGNUP_ENDPOINTS } from './endpoints';
import type { SignupData, SignupResponse } from '../../types';

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    SIGNUP_ENDPOINTS.register,
    data
  );
  return response.data;
};

