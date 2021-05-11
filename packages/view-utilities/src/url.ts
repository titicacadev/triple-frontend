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
  options?: {
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
    strictNullHandling?: boolean
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

  const { strictNullHandling = true, ...restOptions } = options || {}

  const query = qs.stringify(
    {
      ...(baseUrlQuery && qs.parse(baseUrlQuery, { strictNullHandling })),
      ...(elementQuery && qs.parse(elementQuery, { strictNullHandling })),
    },
    { strictNullHandling, ...restOptions },
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
