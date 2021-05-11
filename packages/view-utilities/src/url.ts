import qs from 'qs'

export interface UrlElements {
  href?: string
  scheme?: string
  host?: string
  path?: string
  query?: string
  hash?: string
}

export function parseUrl(rawHref?: string): UrlElements {
  if (!rawHref) {
    return {}
  }

  const [href = '', scheme = '', host = '', path = '', query = '', hash = ''] =
    rawHref
      .trim()
      .match(
        /^(?:([^:/?#]*):\/\/)?([^/?#]*)(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?/,
      ) || []

  return { href, scheme, host, path, query, hash }
}

export function generateUrl(
  { query: elementQuery, ...restElements }: UrlElements,
  baseUrl?: string,
  option?: {
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
    [key: string]: any
  },
) {
  const { query: baseUrlQuery, ...restBaseUrl }: UrlElements = baseUrl
    ? parseUrl(baseUrl)
    : {}

  const { scheme, host, path, hash } = {
    ...restBaseUrl,
    ...restElements,
  }

  const query = qs.stringify(
    {
      ...(baseUrlQuery && qs.parse(baseUrlQuery)),
      ...(elementQuery && qs.parse(elementQuery)),
    },
    { ...option },
  )

  return [
    scheme && `${scheme}://`,
    host,
    path,
    query && `?${query}`,
    hash && `#${hash}`,
  ]
    .filter((v) => v)
    .join('')
}
