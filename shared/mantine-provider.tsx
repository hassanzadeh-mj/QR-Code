'use client'

import { MantineProvider as Provider } from '@mantine/core'
import '@mantine/core/styles.css'
import { theme } from './theme'

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  )
}