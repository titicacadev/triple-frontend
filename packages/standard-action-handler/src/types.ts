import { UrlElements } from '@titicaca/view-utilities'

export interface NavigateOptions {
  target?: string
  title?: string
  [key: string]: unknown
}

export interface ContextOptions {
  cta?: string
  navigate: (
    rawHref: string,
    params?: NavigateOptions,
  ) => string | undefined | void
}

export type WebAction = (
  url: UrlElements,
  options: ContextOptions,
  handler: {
    execute: (url: string, params?: NavigateOptions) => Promise<void>
  },
) => Promise<boolean>
