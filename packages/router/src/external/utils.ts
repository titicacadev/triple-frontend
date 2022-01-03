import { parseUrl } from '@titicaca/view-utilities'

export function checkHrefIsAbsoluteUrl(href: string): boolean {
  const { host } = parseUrl(href)
  return !!host
}
