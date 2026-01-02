import { axiosInstance } from '@/shared/api/axios-instance';
import { VERIFY_EMAIL_ENDPOINTS } from './endpoints';
import type { VerifyEmailRequest, VerifyEmailResponse } from '../../types';

export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const response = await axiosInstance.get<VerifyEmailResponse>(
    `${VERIFY_EMAIL_ENDPOINTS.verify}?token=${encodeURIComponent(data.token)}`
  );
  return response.data;
};


