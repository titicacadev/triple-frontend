export function parseUrl(rawHref?: string) {
  if (!rawHref) {
    return {}
  }

  const [href = '', scheme = '', host = '', path = '', query = '', hash = ''] =
    rawHref.match(
      /^(?:([^:/?#]*):\/\/)?([^/?#]*)(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?/,
    ) || []

  return { href, scheme, host, path, query, hash }
}
