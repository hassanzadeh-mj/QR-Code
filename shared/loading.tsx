'use client'

import { Box, Container, Stack, Text, Image } from '@mantine/core';





export default function LoadingPage() {
  return (
    <Box 
      pos="fixed" 
      inset={0} 
      bg="white"
    >
      <Container 
        h="100vh" 
        display="flex" 
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Stack align="center" gap="sm">
          <Box pos="relative" w={200} h={200}>
            <Image
              src="/images/logo.png"
              alt="Loading Logo"
              style={{
                animation: 'bounce 2s ease infinite'
              }}
            />
          </Box>
          
          <Text 
            size="xl" 
            fw={600} 
            c="dark.4"
            style={{
              letterSpacing: '0.5px'
            }}
          >
            Loading...
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}