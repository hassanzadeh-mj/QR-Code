'use client';

import { Container, Paper, Title, Button, Stack, Box } from '@mantine/core';
import { useResetPasswordLogic, ResetPasswordFields } from '@/lib/auth/reset-password';
import { IconKey } from '@tabler/icons-react';

export default function ResetPasswordPage() {
  const { form, isLoading, handleSubmit } = useResetPasswordLogic();

  return (
    <Container size="sm" h='100%'>
      <Stack gap="xl" h={'100%'} style={{ position: 'relative' }} mt={70}>
        <Box
          style={{
            position: 'absolute',
            top: '-10rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <Box
            component="img"
            src="/images/new-pass.png"
            alt="Reset Password Header"
            style={{
              maxWidth: '300px',
              borderRadius: '8px',
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
              backgroundColor: 'transparent',
              display: 'block',
            }}
          />
        </Box>

        <Paper 
          shadow="md" 
          p="xl" 
          radius="md" 
          withBorder
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: '2rem',
            paddingTop: '4rem',
          }}
        >
          <Stack gap="lg">
            <Title order={2} ta="center">
              Reset Password
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <ResetPasswordFields form={form} />

                <Button
                  type="submit"
                  loading={isLoading}
                  leftSection={<IconKey size={18} />}
                  fullWidth
                  size="lg"
                >
                  Reset Password
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

