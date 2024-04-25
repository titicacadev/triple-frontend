import { parseUrl } from '@titicaca/kint5-view-utilities'

export function checkHrefIsAbsoluteUrl(href: string): boolean {
  const { host } = parseUrl(href)
  return !!host
}
