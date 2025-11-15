'use client';

import { ColorSchemeScript, MantineProvider as BaseMantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'green',
  colors: {
    green: [
      '#ebf7e5',
      '#daf0d0',
      '#bde3b0',
      '#9ed68e',
      '#7db95e',
      '#67a644',
      '#508c32',
      '#3a6d24',
      '#254e17',
      '#112f0a',
    ],
  },
});

export function ColorSchemeScriptLoader() {
  return <ColorSchemeScript defaultColorScheme="auto" />;
}

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" zIndex={1000} />
      {children}
    </BaseMantineProvider>
  );
} 