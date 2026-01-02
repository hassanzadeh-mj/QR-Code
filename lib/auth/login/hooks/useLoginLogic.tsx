'use client';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import type { LoginData } from '../types';
import { loginUser } from '../api/config/controllers';
import { IconCheck, IconX } from '@tabler/icons-react';

export const useLoginLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Invalid email' : null;
      },
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
    },
  });

  const handleSubmit = async (values: LoginData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(values);

      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      notifications.show({
        title: 'Success',
        message: response.message || 'Login successful',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      router.push('/');
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

