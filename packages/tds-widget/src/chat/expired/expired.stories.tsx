import { ComponentProps } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { NolThemeProvider } from '../nol-theme-provider'

import { Expired } from './expired'

export default {
  title: 'tds-widget / chat / Expired',
  component: Expired,
  decorators: [
    (Story) => (
      <NolThemeProvider
        theme={{
          'color-neutral-b-100': 'rgba(41, 41, 45, 1)',
          'color-neutral-b-15': 'rgba(41, 41, 45, 0.15)',
          'color-neutral-b-10': 'rgba(41, 41, 45, 0.1)',
          'color-neutral-w-100': 'rgba(255, 255, 255, 1)',
        }}
      >
        <Story />
      </NolThemeProvider>
    ),
  ],
} as Meta<ComponentProps<typeof Expired>>

export const Default: StoryFn<ComponentProps<typeof Expired>> = () => (
  <Expired />
)
