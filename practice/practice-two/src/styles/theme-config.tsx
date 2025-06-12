import { Theme } from '@radix-ui/themes'
import type { CSSProperties, ReactNode } from 'react'

// Define common theme variables
export const themeTokens = {
  // Color system
  '--black-color-default': '#151515',
  '--black-shade-1': '#575757',
  '--black-shade-2': '#A9A9A9',
  '--black-shade-3': '#D1D1D1',
  '--black-shade-4': '#EBEBEB',
  '--black-shade-5': '#F5F5F5',
  '--black-shade-6': '#F9F9F9',
  '--white-color': '#FFFFFF',

  '--green-color-default': '#6A983C',
  '--green-shade-1': '#46760A',
  '--green-shade-2': '#92C064',
  '--green-shade-3': '#C8DEB3',
  '--green-shade-4': '#F4F8EC',

  '--coral-color-default': '#E5704B',
  '--coral-shade-1': '#C7522D',
  '--coral-shade-2': '#EB8D70',
  '--coral-shade-3': '#F7C6B7',
  '--coral-shade-4': '#FFF1ED',

  // System states
  '--system-error': '#D8000C',
  '--system-warning': '#FFD700',
  '--system-success': '#4BB543',

  // Typography
  '--font-family-primary': "'Poppins', sans-serif",
  '--font-family-secondary': "'Open Sans', sans-serif",
  '--font-weight-regular': '400',
  '--font-weight-medium': '500',
  '--font-weight-semibold': '600',
  '--font-weight-bold': '700',

  // Spacing
  '--space-1': '4px',
  '--space-2': '8px',
  '--space-3': '12px',
  '--space-4': '16px',
  '--space-5': '24px',
  '--space-6': '32px',
  '--space-7': '48px',
  '--space-8': '64px',

  // Radius
  '--radius-sm': '4px',
  '--radius-md': '8px',
  '--radius-lg': '12px',

  // Shadows
  '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
  '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
  '--shadow-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',

  // Transitions
  '--transition-fast': '0.15s',
  '--transition-normal': '0.25s',
  '--transition-slow': '0.35s',

  // Component-specific tokens
  // Button
  '--button-accent-bg': 'var(--green-color-default)',
  '--button-accent-text': 'var(--white-color)',
  '--button-outline-bg': 'transparent',
  '--button-outline-text': 'var(--black-color-default)',
  '--button-border-color': 'var(--green-shade-2)',
  '--button-border-width': '2px',
  '--button-border-radius': 'var(--radius-lg)',
  '--button-height-1': '36px',
  '--button-height-2': '42px',
  '--button-height-3': '48px',
  '--button-padding-1': '0 16px',
  '--button-padding-2': '0 20px',
  '--button-padding-3': '0 24px',
  '--button-font-weight': 'var(--font-weight-bold)',
  '--button-font-size': '15px',

  // Dialog
  '--dialog-bg': 'var(--white-color)',
  '--dialog-border-radius': 'var(--radius-lg)',
  '--dialog-shadow': 'var(--shadow-lg)',
  '--dialog-overlay-color': 'rgba(0, 0, 0, 0.4)',
  '--dialog-content-padding': '24px',
  '--dialog-title-font-size': '22px',
  '--dialog-title-font-weight': 'var(--font-weight-semibold)',
  '--dialog-close-size': '32px',

  // Form Controls
  '--input-bg': 'var(--black-shade-5)',
  '--input-border': '1px solid var(--black-shade-3)',
  '--input-text': 'var(--black-color-default)',
  '--input-placeholder': 'var(--black-shade-2)',
  '--input-radius': 'var(--radius-lg)',
  '--input-padding': '11.5px 18.5px',
  '--input-height': '42px',
  '--input-font-size': '14px',
  '--input-focus-border': 'var(--green-color-default)',
  '--input-error-border': 'var(--system-error)',
  '--label-font-size': '12px',
  '--label-font-weight': 'var(--font-weight-semibold)',

  // Tabs
  '--tabs-border': '1px solid var(--black-shade-4)',
  '--tabs-active-border': '1px solid var(--green-color-default)',
  '--tabs-font-size': '18px',
  '--tabs-font-weight': 'var(--font-weight-semibold)',
  '--tabs-padding': '0 63px 16px 0',

  // Checkbox
  '--checkbox-size': '24px',
  '--checkbox-bg': 'transparent',
  '--checkbox-border': '1.5px solid var(--black-shade-3)',
  '--checkbox-radius': '4px',
  '--checkbox-checked-bg': 'var(--green-color-default)',
  '--checkbox-checked-border': 'var(--green-color-default)',
  '--checkbox-indicator-color': 'var(--white-color)',

  // Radio
  '--radio-size': '24px',
  '--radio-border': '2px solid var(--black-shade-3)',
  '--radio-dot-size': '12px',
  '--radio-dot-color': 'var(--green-color-default)',
  '--radio-checked-border': 'var(--green-color-default)',

  // Toast
  '--toast-bg': 'var(--white-color)',
  '--toast-border-radius': 'var(--radius-md)',
  '--toast-shadow': 'var(--shadow-md)',
  '--toast-padding': '16px',
  '--toast-title-font-size': '16px',
  '--toast-title-font-weight': 'var(--font-weight-semibold)',
  '--toast-success-color': 'var(--system-success)',
  '--toast-error-color': 'var(--system-error)',
  '--toast-warning-color': 'var(--system-warning)',

  // Select
  '--select-trigger-height': '42px',
  '--select-content-bg': 'var(--white-color)',
  '--select-content-shadow': 'var(--shadow-md)',
  '--select-item-height': '36px',
  '--select-item-padding': '0 16px',
  '--select-item-hover': 'var(--green-shade-4)',
  '--select-icon-color': 'var(--black-shade-1)',
  '--select-icon-color-accent': 'var(--green-color-default)',
  '--select-item-text-color': 'var(--black-color-default)',
  '--select-item-indicator-color': 'var(--green-color-default)',
  '--select-border-radius': 'var(--radius-lg)',
  '--select-font-size': '15px',
  '--select-font-weight-normal': 'var(--font-weight-regular)',
  '--select-font-weight-accent': 'var(--font-weight-bold)',
  '--select-scroll-button-color': 'var(--black-shade-2)',
  '--select-content-border': '1px solid var(--black-shade-4)',
  '--select-trigger-font-size': '15px',
  '--select-trigger-padding': '0px 8px',

  // Menubar
  '--menubar-bg': 'var(--black-shade-6)',
  '--menubar-item-height': '56px',
  '--menubar-item-padding': '16px 20px',
  '--menubar-item-font-size': '15px',
  '--menubar-item-font-weight': 'var(--font-weight-medium)',
  '--menubar-item-color': 'var(--black-color-default)',
  '--menubar-item-hover-bg': 'var(--black-shade-5)',
  '--menubar-content-bg': 'var(--white-color)',
  '--menubar-content-border': '1px solid var(--black-shade-4)',
  '--menubar-content-shadow': 'var(--shadow-md)',
  '--menubar-content-border-radius': 'var(--radius-md)',
  '--menubar-sub-item-height': '36px',
  '--menubar-sub-item-padding': '12px 16px',
  '--menubar-sub-item-font-size': '15px',
  '--menubar-sub-item-color': 'var(--black-shade-1)',
  '--menubar-sub-item-hover-bg': 'var(--green-shade-4)',

  // Accordion
  '--accordion-item-border': '1px solid var(--black-shade-5)',
  '--accordion-trigger-height': '48px',
  '--accordion-trigger-padding': '16px',
  '--accordion-trigger-font-size': '18px',
  '--accordion-trigger-font-weight': 'var(--font-weight-semibold)',
  '--accordion-trigger-color': 'var(--black-color-default)',
  '--accordion-trigger-hover-bg': 'var(--black-shade-6)',
  '--accordion-content-bg': 'var(--black-shade-6)',
  '--accordion-content-padding': '0 16px 16px',
  '--accordion-icon-color': 'var(--black-shade-2)',
  '--accordion-animation-duration': '300ms',
  '--accordion-animation-curve': 'cubic-bezier(0.87, 0, 0.13, 1)',
  '--accordion-item-mobile-padding': '0 0 0 16px',
  '--accordion-item-mobile-border-radius': '12px',
}

export const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <Theme
    appearance="light"
    accentColor="green"
    grayColor="slate"
    radius="medium"
    scaling="100%"
    className="freshnesecom-theme"
    style={themeTokens as CSSProperties}
  >
    {children}
  </Theme>
)
