'use client';

import { PasswordInput, Stack } from '@mantine/core';
import type { ResetPasswordData } from '../types';
import type { UseFormReturnType } from '@mantine/form';

interface ResetPasswordFieldsProps {
  form: UseFormReturnType<ResetPasswordData>;
}

export const ResetPasswordFields = ({ form }: ResetPasswordFieldsProps) => {
  return (
    <Stack gap="md">
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        required
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter your new password"
        required
        {...form.getInputProps('confirmPassword')}
      />
    </Stack>
  );
};

