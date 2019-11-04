interface UrlElements {
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

export function generateUrl(elements: UrlElements, baseUrl?: string) {
  const { scheme, host, path, query, hash } = {
    ...(baseUrl && parseUrl(baseUrl)),
    ...elements,
  }

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
