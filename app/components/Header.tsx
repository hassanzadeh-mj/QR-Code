'use client'

import { Container, Group, Title, Button, Text, ActionIcon, Menu } from '@mantine/core'
import { IconQrcode, IconBrandGithub, IconShare, IconDotsVertical, IconHeart, IconBrandTwitter, IconBrandDiscord, IconMoonStars, IconSun } from '@tabler/icons-react'
import { useState } from 'react'

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    // Add theme switching logic here
  }

  return (
    <header className="header">
      <Container size="lg">
        <Group justify="space-between" h="100%">
          <div className="logo-group">
            <div className="logo-container">
              <IconQrcode
                size={32}
                className="logo-icon"
                style={{
                  color: 'var(--mantine-primary-6)',
                }}
                stroke={1.5}
              />
              <div className="logo-glow" />
            </div>
            <div className="logo-text-container">
              <Title
                order={3}
                className="logo-text"
                style={{
                  background: 'linear-gradient(135deg, var(--mantine-primary-6), var(--mantine-secondary-6))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                }}
              >
                QR Generator
              </Title>
              <Text size="xs" c="dimmed" mt={-5}>
                Create beautiful QR codes instantly
              </Text>
            </div>
          </div>

          <Group gap="md">
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              onClick={toggleTheme}
              className="theme-toggle"
            >
              {theme === 'light' ? (
                <IconMoonStars size={20} stroke={1.5} />
              ) : (
                <IconSun size={20} stroke={1.5} />
              )}
            </ActionIcon>

            <Button
              component="a"
              href="https://github.com/yourusername/qr-generator"
              target="_blank"
              variant="subtle"
              color="gray"
              leftSection={<IconBrandGithub size={18} />}
              className="github-button"
            >
              Star on GitHub
            </Button>

            <Button
              variant="gradient"
              gradient={{ from: 'var(--mantine-primary-6)', to: 'var(--mantine-secondary-6)' }}
              leftSection={<IconShare size={18} />}
              className="share-button"
            >
              Share
            </Button>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  radius="xl"
                  className="menu-button"
                >
                  <IconDotsVertical size={20} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Community</Menu.Label>
                <Menu.Item
                  leftSection={<IconHeart size={14} color="var(--mantine-secondary-6)" />}
                >
                  Support Us
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconBrandTwitter size={14} color="var(--mantine-primary-6)" />}
                >
                  Follow on Twitter
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconBrandDiscord size={14} color="#5865F2" />}
                >
                  Join Discord
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </header>
  )
} 