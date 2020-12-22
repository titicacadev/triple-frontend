import { generateUrl, parseUrl } from '@titicaca/view-utilities'

export function addWebUrlBase(href: string, webUrlBase: string): string {
  const { scheme, host } = parseUrl(webUrlBase)

  return generateUrl({ scheme, host }, href)
}
