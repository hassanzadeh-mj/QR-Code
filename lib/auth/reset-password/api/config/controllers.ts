import { axiosInstance } from '@/shared/api/axios-instance';
import { RESET_PASSWORD_ENDPOINTS } from './endpoints';
import type { ResetPasswordData, ResetPasswordResponse } from '../../types';

export const resetPassword = async (
  token: string,
  data: Omit<ResetPasswordData, 'confirmPassword'>
): Promise<ResetPasswordResponse> => {
  const response = await axiosInstance.post<ResetPasswordResponse>(
    `${RESET_PASSWORD_ENDPOINTS.reset}?token=${encodeURIComponent(token)}`,
    { password: data.password }
  );
  return response.data;
};

