'use client';

import { Container, Paper, Title, Stack, Box, Text, Alert, Button } from '@mantine/core';
import { IconCheck, IconX, IconMail } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const success = searchParams.get('success');
    const errorParam = searchParams.get('error');
    const token = searchParams.get('token');

    if (success === 'true') {
      setIsVerified(true);
      if (token) {
        localStorage.setItem('token', token);
      }
      setIsLoading(false);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam));
      setIsLoading(false);
    } else {
      setError('Invalid verification link');
      setIsLoading(false);
    }
  }, [searchParams, router]);

  return (
    <Container size="md" h="100vh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper shadow="md" p="xl" radius="md" withBorder style={{ maxWidth: '500px', width: '100%' }}>
        <Stack gap="lg" align="center">
          {isVerified && (
            <>
              <Box
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7db95e, #67a644)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconCheck size={40} color="white" />
              </Box>
              <Title order={2} ta="center" c="green">
                Email Verified!
              </Title>
              <Text c="dimmed" ta="center">
                Your email has been successfully verified. Redirecting to login...
              </Text>
            </>
          )}

          {error && !isLoading && (
            <>
              <Box
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconX size={40} color="white" />
              </Box>
              <Title order={2} ta="center" c="red">
                Verification Failed
              </Title>
              <Alert icon={<IconMail size={16} />} title="Error" color="red">
                {error}
              </Alert>
              <Button
                onClick={() => router.push('/signup')}
                leftSection={<IconMail size={18} />}
                fullWidth
              >
                Back to Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}


