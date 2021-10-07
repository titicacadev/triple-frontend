import { UrlElements } from '@titicaca/view-utilities'

export type ContextOptions = {
  cta?: string
  isPublic?: boolean
  navigate: (rawHref: string, params?: any) => string | undefined | void
}

export type WebAction = (
  url: UrlElements,
  options: ContextOptions,
  handler: { execute: (url: string, params?: any) => Promise<void> },
) => Promise<boolean>
