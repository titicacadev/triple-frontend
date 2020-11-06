import { parse } from 'qs'
import { parseUrl, generateUrl } from '@titicaca/view-utilities'

const PUBLIC_ROUTELIST_REGEXES = [
  /^\/regions\/[^/]+\/(attractions|restaurants|articles)\/[^/]+$/,
  /^\/regions\/[^/]+\/hotels(\/.*)?$/,
  /^\/(attractions|restaurants|hotels|articles)\/[^/]+$/,
  /^\/hotels\/?$/,
  /^\/hotels\/list(\/.+)?$/,
  /^\/hotels\/curation(\/.+)?$/,
]

export function checkIfRoutable({ href }: { href: string }) {
  const { host, path } = parseUrl(href)

  if (!host && path) {
    return PUBLIC_ROUTELIST_REGEXES.some((regex) => path.match(regex))
  }

  return true
}

export function generateTargetAddressOnPublic({
  href,
  webUrlBase,
}: {
  href: string
  webUrlBase: string
}): string {
  const { host: webUrlBaseHost } = parseUrl(webUrlBase)
  const { host, path, query, ...rest } = parseUrl(href)

  if (host && webUrlBaseHost === host) {
    return generateUrl({ path, query, ...rest, scheme: undefined })
  } else if (host) {
    return generateUrl({ host, path, query, ...rest })
  } else if (path === '/inlink') {
    const { path, _web_expand: expandable } = parse(query as string)

    return expandable !== undefined ? (path as string) : href
  } else if (path === '/outlink') {
    const { url } = parse(query as string)

    return generateTargetAddressOnPublic({ href: url as string, webUrlBase })
  }

  return href
}
