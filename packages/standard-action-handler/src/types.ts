import { UrlElements } from '@titicaca/view-utilities'

export type ContextOptions = {
  cta?: string
  navigate: (rawHref: string, params?: any) => string | undefined | void
  appUrlScheme: string
}

export type WebAction = (
  url: UrlElements,
  options: ContextOptions,
  handler: { execute: (url: string, params?: any) => Promise<void> },
) => Promise<boolean>
