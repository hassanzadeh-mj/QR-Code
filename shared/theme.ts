import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: [
      '#F0F7FF', // 0: Lightest
      '#CCE4FF', // 1
      '#99CCFF', // 2
      '#66B3FF', // 3
      '#3399FF', // 4
      '#0080FF', // 5: Main color from logo
      '#0066CC', // 6
      '#004C99', // 7
      '#003366', // 8
      '#001933'  // 9: Darkest
    ],
  },
  components: {
    Button: {
      defaultProps: {
        color: 'primary',
      },
      styles: {
        root: {
          fontWeight: 500,
          fontSize: '0.95rem',
          height: '2.75rem',
        }
      }
    },
    Card: {
      defaultProps: {
        padding: 'xl',
      }
    },
    TextInput: {
      styles: {
        input: {
          height: '2.75rem',
        }
      }
    },
    FileInput: {
      styles: {
        input: {
          height: '2.75rem',
        }
      }
    },
    Slider: {
      styles: {
        root: {
          marginTop: '0.5rem',
        },
        thumb: {
          height: '1.25rem',
          width: '1.25rem',
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        track: {
          height: '0.5rem',
        }
      }
    }
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 8px rgba(0,0,0,0.1)',
    lg: '0 8px 16px rgba(0,0,0,0.1)',
  },
  other: {
    borderRadius: '0.75rem',
    headerHeight: '4.5rem',
  }
});