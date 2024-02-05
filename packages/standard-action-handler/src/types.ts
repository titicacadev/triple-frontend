import { UrlElements } from '@titicaca/view-utilities'
import { App } from '@titicaca/react-triple-client-interfaces'
import { TransitionType } from '@titicaca/modals'

export interface NavigateOptions {
  target?: 'browser'
  title?: string
  [key: string]: unknown
}

type TargetType = 'current' | 'new' | 'browser'

export interface ContextOptions {
  cta?: string
  navigate?: (
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
  app?: App | null
  showTransitionModal?: (type: TransitionType) => void
}

export interface WebActionParams {
  url?: UrlElements
  options?: ContextOptions
  handler?: {
    execute: (url: string, params?: NavigateOptions) => Promise<void>
  }
}

export type WebAction = (webActionParams: WebActionParams) => Promise<boolean>
