// Remove the import for createTheme
import { Theme } from '@radix-ui/themes'

// Keep the theme variables
export const themeVariables = {
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  // rest of your variables
}

// Define CSS custom properties for component overrides
// These will be used in your global CSS and as style props
export const themeTokens = {
  // Button
  '--button-accent-bg': 'var(--green-color-default)',
  '--button-outline-bg': 'transparent',
  '--button-accent-text': 'white',
  '--button-outline-text': 'var(--black-color-default)',
  '--button-height-1': '32px',
  '--button-height-2': '40px',
  '--button-height-3': '48px',
  '--button-border-color': 'var(--green-shade-2)',
  '--button-border-width': '2px',
  '--button-padding-1': '0 12px',
  '--button-padding-2': '0 16px',
  '--button-padding-3': '0 24px',

  // Card
  '--card-bg-default': 'white',
  '--card-bg-accent': 'var(--gray-1)',
  '--card-padding-1': '12px',
  '--card-padding-2': '16px',
  '--card-padding-3': '24px',
  '--card-border-color': 'var(--gray-6)',
  '--card-border-width': '1px',
  '--card-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',

  // Dialog
  '--dialog-bg': 'white',
  '--dialog-border-radius': 'var(--border-radius-md)',
  '--dialog-shadow': '0 4px 24px rgba(0, 0, 0, 0.12)',

  // Text
  '--text-color-default': 'var(--black-color-default)',
  '--text-color-accent': 'var(--green-color-default)',
  '--text-color-muted': 'var(--black-shade-3)',

  // Badge
  '--badge-bg-error': 'var(--system-error)',
  '--badge-bg-warning': 'var(--system-warning)',
  '--badge-bg-success': 'var(--system-success)',
  '--badge-color-error': 'white',
  '--badge-color-warning': 'var(--black-color-default)',
  '--badge-color-success': 'white',

  // Global styles
  '--font-weight-regular': '400',
  '--font-weight-medium': '500',
  '--font-weight-semibold': '600',
  '--font-weight-bold': '700',
  '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.06)',
  '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
  '--shadow-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
  '--transition-fast': '0.15s',
  '--transition-normal': '0.25s',
  '--transition-slow': '0.35s',
}

// Add this to inject your theme into the app
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <Theme
    appearance="light"
    accentColor="green"
    grayColor="slate"
    radius="medium"
    scaling="100%"
    className="freshnesecom-theme"
    style={themeTokens as React.CSSProperties}
  >
    {children}
  </Theme>
)
