import { UrlElements } from '@titicaca/view-utilities'

export interface NavigateOptions {
  target?: 'browser'
  title?: string
  [key: string]: unknown
}

type TargetType = 'current' | 'new' | 'browser'

export interface ContextOptions {
  cta?: string
  navigate: (
    rawHref: string,
    params?: NavigateOptions,
  ) => string | undefined | void
  routeExternally?: ({
    href,
    target,
  }: {
    href: string
    target: TargetType
  }) => void
}

export type WebAction = (
  url: UrlElements,
  options: ContextOptions,
  handler: {
    execute: (url: string, params?: NavigateOptions) => Promise<void>
  },
) => Promise<boolean>
