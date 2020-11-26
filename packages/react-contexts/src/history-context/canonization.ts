import { parse } from 'qs'
import { parseUrl, generateUrl } from '@titicaca/view-utilities'

export function canonizeTargetAddress({
  href,
  webUrlBase,
  expandInlinkStrictly,
}: {
  href: string
  webUrlBase: string
  expandInlinkStrictly: boolean
}): string {
  const { host: webUrlBaseHost } = parseUrl(webUrlBase)
  const { host, path, query, ...rest } = parseUrl(href)

  if (host && webUrlBaseHost === host) {
    return generateUrl({ path, query, ...rest, scheme: undefined })
  } else if (host) {
    return href
  } else if (path === '/inlink') {
    const { path, _web_expand: expandable } = parse(query as string)
    const shouldExpandOnStrictMode = expandable !== undefined

    return !expandInlinkStrictly || shouldExpandOnStrictMode
      ? (path as string)
      : href
  } else if (path === '/outlink') {
    const { url } = parse(query as string)

    return canonizeTargetAddress({
      href: url as string,
      webUrlBase,
      expandInlinkStrictly,
    })
  }

  return href
}
