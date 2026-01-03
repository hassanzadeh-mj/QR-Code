'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { verifyEmail } from '../api/config/controllers';
import { IconCheck, IconX } from '@tabler/icons-react';

export const useVerifyEmailLogic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('Verification token is missing');
      setIsLoading(false);
      return;
    }

    const handleVerify = async () => {
      try {
        const response = await verifyEmail({ token });

        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        setIsVerified(true);
        notifications.show({
          title: 'Success',
          message: response.message || 'Email verified successfully',
          color: 'green',
          icon: <IconCheck size={16} />,
        });

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Verification failed';
        setError(errorMessage);
        notifications.show({
          title: 'Error',
          message: errorMessage,
          color: 'red',
          icon: <IconX size={16} />,
        });
      } finally {
        setIsLoading(false);
      }
    };

    handleVerify();
  }, [searchParams, router]);

  return {
    isLoading,
    isVerified,
    error,
  };
};



