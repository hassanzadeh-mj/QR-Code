import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScriptLoader } from "./shared/mantine-provider";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";
import { AppShell, AppShellHeader, AppShellMain, Container, Group, Image, Title, Box, Badge, ActionIcon } from '@mantine/core';
import { ThemeToggle } from "./components/ThemeToggle";
import { IconBrandGithub, IconShare } from '@tabler/icons-react';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate QR codes easily with your custom logo and styling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScriptLoader />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <MantineProvider>
          <AppShell
            header={{ height: 80 }}
            padding="md"
          >
            <AppShellHeader
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(125, 185, 94, 0.1)',
                boxShadow: '0 4px 20px rgba(125, 185, 94, 0.08)',
              }}
            >
              <Container size="xl" h="100%">
                <Group h="100%" justify="space-between" align="center">
                  <Group gap="md" align="center">
                    <Box 
                      style={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #7db95e, #67a644)',
                        padding: '8px',
                        boxShadow: '0 4px 15px rgba(125, 185, 94, 0.3)',
                        animation: 'logoGlow 3s ease-in-out infinite alternate',
                      }}
                    >
                      <Image
                        src="/images/1000047341.png"
                        alt="Logo"
                        w={48}
                        h={48}
                        fit="contain"
                        style={{
                          filter: 'brightness(1.1) contrast(1.1)',
                        }}
                      />
                    </Box>
                    <Box>
                      <Title 
                        order={2} 
                        style={{
                          background: 'linear-gradient(135deg, #7db95e, #508c32)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: '1.75rem',
                          fontWeight: 800,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                        }}
                      >
                        QR Generator
                      </Title>
                      <Badge 
                        size="xs" 
                        variant="light" 
                        color="green"
                        style={{
                          marginTop: '2px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                        }}
                      >
                        Professional
                      </Badge>
                    </Box>
                  </Group>
                  
                  <Group gap="sm">
                    <ActionIcon
                      variant="subtle"
                      size="lg"
                      color="gray"
                      style={{
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      <IconBrandGithub size={20} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      size="lg"
                      color="gray"
                      style={{
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      <IconShare size={20} />
                    </ActionIcon>
                    <ThemeToggle />
                  </Group>
                </Group>
              </Container>
            </AppShellHeader>
            <AppShellMain            >
              {children}
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
