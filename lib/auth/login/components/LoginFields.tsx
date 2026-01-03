'use client';

import { TextInput, PasswordInput, Stack, Anchor, Box } from '@mantine/core';
import Link from 'next/link';
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
      <Box>
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          {...form.getInputProps('password')}
        />
        <Anchor
          component={Link}
          href="/reset-password"
          size="sm"
          style={{
            marginTop: '8px',
            display: 'block',
            textAlign: 'right',
          }}
        >
          Forgot password?
        </Anchor>
      </Box>
    </Stack>
  );
};

