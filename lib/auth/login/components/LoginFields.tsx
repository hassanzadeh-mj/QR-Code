'use client';

import { TextInput, PasswordInput, Stack } from '@mantine/core';
import type { LoginData } from '../types';
import type { UseFormReturnType } from '@mantine/form';

interface LoginFieldsProps {
  form: UseFormReturnType<LoginData>;
}

export const LoginFields = ({ form }: LoginFieldsProps) => {
  return (
    <Stack gap="md">
      <TextInput
        label="Email"
        placeholder="example@email.com"
        type="email"
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        required
        {...form.getInputProps('password')}
      />
    </Stack>
  );
};

