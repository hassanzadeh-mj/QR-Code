'use client';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ResetPasswordData } from '../types';
import { resetPassword } from '../api/config/controllers';
import { IconCheck, IconX } from '@tabler/icons-react';

export const useResetPasswordLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordData>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = async (values: ResetPasswordData) => {
    const token = searchParams.get('token');

    if (!token) {
      notifications.show({
        title: 'Error',
        message: 'Reset token is missing',
        color: 'red',
        icon: <IconX size={16} />,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(token, values);

      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      notifications.show({
        title: 'Success',
        message: response.message || 'Password reset successfully',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
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

  return {
    form,
    isLoading,
    handleSubmit,
  };
};

