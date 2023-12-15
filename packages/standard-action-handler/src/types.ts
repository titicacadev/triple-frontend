import { UrlElements } from '@titicaca/view-utilities'
import { ClientAppValue } from '@titicaca/triple-web'

export interface NavigateOptions {
  target?: 'browser'
  title?: string
  [key: string]: unknown
}

export interface ContextOptions {
  cta?: string
  navigate?: (
    rawHref: string,
    params?: NavigateOptions,
  ) => string | undefined | void
  openInlink?: (path: string) => void
  openOutlink?: (url: string) => void
  app?: ClientAppValue
}

export interface WebActionParams {
  url?: UrlElements
  options?: ContextOptions
  handler?: {
    execute: (url: string, params?: NavigateOptions) => Promise<void>
  }
}

export type WebAction = (webActionParams: WebActionParams) => Promise<boolean>
