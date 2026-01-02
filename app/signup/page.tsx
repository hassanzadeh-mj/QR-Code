'use client';

import { Container, Paper, Title, Button, Stack, Image, Box } from '@mantine/core';
import { useSignupLogic, SignupFields } from '@/lib/auth/signup';
import { IconUserPlus } from '@tabler/icons-react';

export default function SignupPage() {
  const { form, isLoading, handleSubmit } = useSignupLogic();

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
            src="/images/signup.png"
            alt="Signup Header"
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
              Sign Up
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <SignupFields form={form} />

                <Button
                  type="submit"
                  loading={isLoading}
                  leftSection={<IconUserPlus size={18} />}
                  fullWidth
                  size="lg"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

